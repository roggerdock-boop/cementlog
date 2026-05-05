import Int "mo:core/Int";
import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import ArticleTypes "../types/articles";
import Common "../types/common";

module {
  public type Article = ArticleTypes.Article;
  public type ArticleInternal = ArticleTypes.ArticleInternal;
  public type CreateArticleInput = ArticleTypes.CreateArticleInput;
  public type UpdateArticleInput = ArticleTypes.UpdateArticleInput;
  public type ArticleListResult = ArticleTypes.ArticleListResult;
  public type ArticleId = Common.ArticleId;
  public type ListArticlesFilter = Common.ListArticlesFilter;

  /// Convert internal mutable article to shared public Article
  public func toPublic(self : ArticleInternal) : Article {
    {
      id = self.id;
      title = self.title;
      slug = self.slug;
      content = self.content;
      excerpt = self.excerpt;
      authorName = self.authorName;
      category = self.category;
      metaDescription = self.metaDescription;
      featuredImageUrl = self.featuredImageUrl;
      status = self.status;
      publishDate = self.publishDate;
      lastUpdated = self.lastUpdated;
      viewCount = self.viewCount;
    };
  };

  /// Create a new internal article record from input
  public func createNew(
    id : ArticleId,
    input : CreateArticleInput,
    now : Common.Timestamp,
  ) : ArticleInternal {
    {
      id;
      var title = input.title;
      var slug = input.slug;
      var content = input.content;
      var excerpt = input.excerpt;
      var authorName = input.authorName;
      var category = input.category;
      var metaDescription = input.metaDescription;
      var featuredImageUrl = input.featuredImageUrl;
      var status = input.status;
      var publishDate = input.publishDate;
      var lastUpdated = now;
      var viewCount = 0;
    };
  };

  /// Apply update input to an existing internal article
  public func applyUpdate(
    self : ArticleInternal,
    input : UpdateArticleInput,
    now : Common.Timestamp,
  ) {
    self.title := input.title;
    self.slug := input.slug;
    self.content := input.content;
    self.excerpt := input.excerpt;
    self.authorName := input.authorName;
    self.category := input.category;
    self.metaDescription := input.metaDescription;
    self.featuredImageUrl := input.featuredImageUrl;
    self.status := input.status;
    self.publishDate := input.publishDate;
    self.lastUpdated := now;
  };

  /// Get article by id from the map
  public func getById(
    articlesById : Map.Map<ArticleId, ArticleInternal>,
    id : ArticleId,
  ) : ?Article {
    switch (articlesById.get(id)) {
      case (?a) ?toPublic(a);
      case null null;
    };
  };

  /// Get article by slug from the list
  public func getBySlug(
    articles : List.List<ArticleInternal>,
    slug : Text,
  ) : ?Article {
    switch (articles.find(func(a : ArticleInternal) : Bool { a.slug == slug })) {
      case (?a) ?toPublic(a);
      case null null;
    };
  };

  /// List articles with filter, pagination, and sorting
  public func listArticles(
    articles : List.List<ArticleInternal>,
    filter : ListArticlesFilter,
  ) : ArticleListResult {
    // Apply category and status filters
    let filtered = articles.filter(func(a : ArticleInternal) : Bool {
      let categoryMatch = switch (filter.category) {
        case null true;
        case (?cat) a.category == cat;
      };
      let statusMatch = switch (filter.status) {
        case null true;
        case (?s) a.status == s;
      };
      categoryMatch and statusMatch;
    });

    let total = filtered.size();

    // Sort
    let sorted = switch (filter.sortBy) {
      case (#date) {
        filtered.sort(func(a : ArticleInternal, b : ArticleInternal) : { #less; #equal; #greater } {
          Int.compare(b.publishDate, a.publishDate);
        });
      };
      case (#viewCount) {
        filtered.sort(func(a : ArticleInternal, b : ArticleInternal) : { #less; #equal; #greater } {
          if (a.viewCount > b.viewCount) #less
          else if (a.viewCount < b.viewCount) #greater
          else #equal;
        });
      };
    };

    // Paginate
    let start = filter.page * filter.pageSize;
    let pageItems = sorted.values()
      |> _.drop(start)
      |> _.take(filter.pageSize)
      |> _.map(func(a : ArticleInternal) : Article { toPublic(a) })
      |> _.toArray();

    {
      articles = pageItems;
      total;
      page = filter.page;
      pageSize = filter.pageSize;
    };
  };

  /// Search articles by title, content, and excerpt (case-insensitive substring)
  public func searchArticles(
    articles : List.List<ArticleInternal>,
    searchTerm : Text,
  ) : [Article] {
    let term = searchTerm.toLower();
    articles.filter(func(a : ArticleInternal) : Bool {
      a.title.toLower().contains(#text term) or
      a.content.toLower().contains(#text term) or
      a.excerpt.toLower().contains(#text term);
    })
    .values()
    .map(func(a : ArticleInternal) : Article { toPublic(a) })
    .toArray();
  };

  /// Get N most recently published articles
  public func getLatestArticles(
    articles : List.List<ArticleInternal>,
    n : Nat,
  ) : [Article] {
    let published = articles.filter(func(a : ArticleInternal) : Bool {
      a.status == #published;
    });
    let sorted = published.sort(func(a : ArticleInternal, b : ArticleInternal) : { #less; #equal; #greater } {
      Int.compare(b.publishDate, a.publishDate);
    });
    sorted.values()
    .take(n)
    .map(func(a : ArticleInternal) : Article { toPublic(a) })
    .toArray();
  };

  /// Get N most viewed published articles
  public func getPopularArticles(
    articles : List.List<ArticleInternal>,
    n : Nat,
  ) : [Article] {
    let published = articles.filter(func(a : ArticleInternal) : Bool {
      a.status == #published;
    });
    let sorted = published.sort(func(a : ArticleInternal, b : ArticleInternal) : { #less; #equal; #greater } {
      if (a.viewCount > b.viewCount) #less
      else if (a.viewCount < b.viewCount) #greater
      else #equal;
    });
    sorted.values()
    .take(n)
    .map(func(a : ArticleInternal) : Article { toPublic(a) })
    .toArray();
  };

  /// Increment view count on an article in place
  public func incrementViewCount(
    articles : List.List<ArticleInternal>,
    id : ArticleId,
  ) {
    articles.mapInPlace(func(a : ArticleInternal) : ArticleInternal {
      if (a.id == id) {
        a.viewCount := a.viewCount + 1;
        a;
      } else a;
    });
  };

  /// Build sample seed articles for init
  public func sampleArticles() : [CreateArticleInput] {
    let now = Time.now();
    [
      {
        title = "Understanding Kiln Thermal Efficiency in Cement Production";
        slug = "understanding-kiln-thermal-efficiency";
        excerpt = "Kiln thermal efficiency is the cornerstone of clinker production economics. In this guide, we break down heat balance principles, identify the top sources of heat loss, and show how operators can improve specific heat consumption through targeted interventions.";
        content = "<h2>Introduction</h2><p>The rotary kiln is the heart of any cement plant, and its thermal efficiency directly determines the plant's energy cost and environmental footprint. Specific heat consumption — measured in kcal per kilogram of clinker — is the primary KPI that separates world-class facilities from average performers. Top quartile plants achieve below 700 kcal/kg, while poorly optimized kilns can exceed 1,000 kcal/kg.</p><h2>Heat Balance Fundamentals</h2><p>A kiln heat balance accounts for all energy inputs and outputs. The primary input is fuel combustion heat (typically coal, petcoke, or alternative fuels). Heat outputs include: clinker formation enthalpy (theoretically fixed at ~420 kcal/kg), exit gas losses, radiation and convection losses, incomplete combustion, and cooler exhaust.</p><p>Understanding which fraction dominates your loss profile is the first step to improvement. In a well-tuned kiln system, exit gas typically accounts for 15–25% of total heat input, making it the largest controllable loss category.</p><h2>Key Efficiency Drivers</h2><p><strong>Preheater cyclone efficiency:</strong> Each cyclone stage should achieve &gt;85% separation efficiency. Blocked or worn cyclones increase dust re-circulation and raise gas temperatures at the preheater exit.</p><p><strong>Kiln shell radiation:</strong> Damaged or thin refractory leads to hot spots and increased shell radiation. Thermal imaging cameras should be used weekly to detect early refractory wear before it becomes a critical event.</p><p><strong>Excess air control:</strong> Excess oxygen in kiln exit gas above 2–3% represents wasted heat in elevated gas mass flow. Fine-tuning primary and secondary air dampers in response to process oxygen measurements can yield 10–20 kcal/kg improvements.</p><p><strong>Clinker cooler performance:</strong> The clinker cooler recovers hot air as secondary and tertiary combustion air. A cooler with high specific air volume consumption reduces available secondary air temperature, forcing more primary air use and degrading burning zone conditions.</p><h2>Measurement and Monitoring</h2><p>Accurate heat balance calculations require continuous data from: fuel flow and calorific value meters, kiln gas analyzers (O2, CO, NOx), preheater gas temperature and pressure, clinker exit temperature from cooler, and cooler stack temperature. Many plants now use automated heat balance dashboards that update in real time, enabling operators to respond to deviations within minutes rather than hours.</p><h2>Practical Improvement Steps</h2><ol><li>Conduct a full heat balance audit and identify the top three loss categories.</li><li>Calibrate all instrumentation — faulty sensors are a leading cause of misdiagnosis.</li><li>Review burner pipe positioning and primary air percentage (target &lt;8% of stoichiometric air).</li><li>Optimize clinker cooler grate speed and fan airflow distribution.</li><li>Implement a structured refractory inspection and replacement schedule.</li></ol><h2>Conclusion</h2><p>Improving kiln thermal efficiency is an ongoing process, not a one-time project. Plants that build a culture of daily heat balance monitoring and operator engagement consistently outperform peers by 30–50 kcal/kg over a multi-year horizon, translating to significant fuel cost savings and reduced CO2 emissions per tonne of clinker.</p>";
        authorName = "Dr. Ahmed Al-Rashidi";
        category = #Kiln;
        metaDescription = "Learn how to improve rotary kiln thermal efficiency in cement plants. Covers heat balance fundamentals, specific heat consumption KPIs, and practical operator guidelines.";
        featuredImageUrl = null;
        status = #published;
        publishDate = now - 7_200_000_000_000;
      },
      {
        title = "Raw Mill Operation Best Practices for Cement Plants";
        slug = "raw-mill-operation-best-practices";
        excerpt = "A well-operated raw mill is the foundation of consistent kiln feed chemistry. This practical guide covers grinding circuit optimization, moisture management, separator efficiency tuning, and shift handover procedures that leading cement plants use to maximize raw mill output while minimizing specific power consumption.";
        content = "<h2>Why Raw Mill Performance Matters</h2><p>The raw mill prepares the kiln feed — the precisely blended mixture of limestone, clay, sand, and iron ore that will be calcined and sintered into clinker. Variations in raw meal fineness, chemistry, or moisture content propagate directly into kiln instability, increased specific heat consumption, and reduced clinker quality. Getting raw mill operation right is therefore not optional.</p><h2>Feed Chemistry Control</h2><p>Modern raw mills are guided by an online X-ray fluorescence (XRF) analyzer that measures the chemical composition of the raw meal every 2–5 minutes. The three key ratios are the Lime Saturation Factor (LSF), Silica Ratio (SR), and Alumina Ratio (AR). Target ranges typically are: LSF 95–98, SR 2.4–2.6, AR 1.5–1.8, though each plant will have site-specific optima based on clinker mineral targets.</p><p>Operators must respond quickly to XRF excursions by adjusting belt feeder set-points. The key discipline is making small, frequent corrections rather than large step changes, which create feed chemistry oscillations that take hours to dampen.</p><h2>Grinding Efficiency</h2><p><strong>Vertical Roller Mill (VRM) operation:</strong> The grinding table speed, roller pressure, and dam ring height all interact to determine the material bed depth. An inadequate bed depth leads to metal-to-metal contact and excessive vibration, while excessive bed depth increases recirculation and drops throughput. Target table differential pressure within the manufacturer's recommended band.</p><p><strong>Ball mill circuits:</strong> For ball mill raw grinding, the critical parameters are mill filling degree (typically 28–32% by volume), grinding media size distribution, and separator cut point. A regular mill crash stop and filling level check confirms operational targets are being met.</p><h2>Moisture Management</h2><p>Feed moisture above 6–8% can cause material build-up on mill internals, reduce throughput, and increase specific power consumption. Where feed moisture is a recurring issue, consider: drying hoppers on wet material streams, hot gas generator supplementary drying, or pre-drying crushed limestone during humid seasons.</p><h2>Separator Efficiency</h2><p>The dynamic separator is the key to achieving target product fineness at minimum recirculation load. The separator efficiency (Tromp curve sharpness) degrades as rotor blades wear or as air seal gaps increase. A quarterly inspection of rotor, guide vanes, and reject chutes should be scheduled, with blade replacements planned during major maintenance stops.</p><h2>Shift Handover and Log Discipline</h2><p>Process stability across shifts is directly linked to handover quality. Best-practice handover includes: reviewing the last 4 hours of process trends, noting any abnormal events (blockages, sudden chemistry excursions, vibration spikes), confirming current set-points match targets, and documenting any pending maintenance interventions. Plants that enforce structured electronic handover logs show measurably better process availability than those relying on verbal communication alone.</p><h2>Key Performance Indicators</h2><ul><li>Specific power consumption (kWh/t of raw meal)</li><li>Raw meal 90 µm residue (target typically &lt;12%)</li><li>LSF standard deviation (target &lt;1.5)</li><li>Mill availability (%)</li></ul><p>Tracking these four KPIs on a daily basis and reviewing weekly trends in the shift engineer meeting is the minimum standard for a well-run raw mill department.</p>";
        authorName = "Eng. Priya Nair";
        category = #RawMill;
        metaDescription = "Practical raw mill operation guide for cement plant operators. Covers feed chemistry control, VRM grinding efficiency, moisture management, and separator tuning.";
        featuredImageUrl = null;
        status = #published;
        publishDate = now - 3_600_000_000_000;
      },
      {
        title = "Reducing Specific Heat Consumption in Cement Plants: Proven Strategies";
        slug = "reducing-specific-heat-consumption-cement-plants";
        excerpt = "Specific heat consumption (SHC) is one of the most impactful cost drivers in cement manufacturing. This article presents a systematic framework for diagnosing high SHC, prioritizing improvement projects, and sustaining gains through operational discipline — drawing on plant data and industry benchmarks.";
        content = "<h2>The Business Case for SHC Reduction</h2><p>At a plant producing 3,000 tonnes of clinker per day, every 10 kcal/kg improvement in specific heat consumption reduces annual fuel costs by approximately $150,000–$200,000 (at $120/tonne coal equivalent). Multiply this across a multi-kiln site and the economics of SHC reduction become compelling. Beyond cost, lower SHC directly translates to reduced CO2 emissions, a growing concern under carbon pricing schemes and ESG reporting obligations.</p><h2>Diagnostic Framework</h2><p>Before investing in capital improvements, it is essential to understand where heat is being lost. A structured diagnostic follows these steps:</p><ol><li><strong>Instrument audit:</strong> Verify that fuel flow meters, gas analyzers, and temperature sensors are calibrated and accurate. Systematic measurement error is the most common cause of misleading heat balance results.</li><li><strong>Heat balance calculation:</strong> Using audited data, compute input and output heat streams to identify the top loss categories. Focus on: preheater exit gas temperature and volume, cooler exhaust losses, kiln shell radiation, and incomplete combustion.</li><li><strong>Benchmarking:</strong> Compare plant SHC against cement industry benchmarks. A dry process 5-stage preheater kiln should achieve 700–750 kcal/kg. If the plant is significantly above this range, structural or operational issues exist.</li></ol><h2>Top Improvement Levers</h2><h3>1. Preheater Optimization</h3><p>A 10°C reduction in preheater cyclone exit gas temperature typically saves 5–7 kcal/kg. Improvements to achieve this include cleaning or replacing blocked cyclones, repairing air leaks in duct joints (false air increases gas volume and heat loss), and optimizing meal feed distribution across cyclone inlets.</p><h3>2. Combustion Management</h3><p>Excess air is a silent SHC penalty. Each percentage point of excess O2 in kiln exit gas adds approximately 2–3 kcal/kg due to elevated sensible heat in the gas mass. Deploy a multi-point gas analysis system to eliminate local O2 pockets caused by bypass air ingress.</p><h3>3. Alternative Fuel Substitution</h3><p>Replacing coal or petcoke with pre-processed alternative fuels (AFR) — such as refuse-derived fuel (RDF), tire-derived fuel (TDF), or industrial waste — does not directly reduce SHC, but substitutes lower-cost energy, improving the economics of heat consumption. The key technical requirement is maintaining stable flame characteristics to avoid kiln process disruptions.</p><h3>4. Clinker Cooler Efficiency</h3><p>The cooler's primary role is to recover heat from clinker as secondary and tertiary air for combustion. A cooler operating with high specific cooling air flow (above 2.2 Nm3/kg clinker) indicates poor air distribution. Upgrading to modern servo-controlled grate drives and optimizing fan zone pressures can recover 15–25 kcal/kg in marginal cases.</p><h3>5. Insulation and Refractory Management</h3><p>A 1 mm reduction in refractory thickness at the kiln burning zone increases shell radiation loss by approximately 3–5 kW/m2. A systematic thermographic inspection program, combined with a predictive refractory replacement schedule, prevents thermal loss escalation between major maintenance stops.</p><h2>Sustaining Gains</h2><p>SHC improvements are notoriously difficult to sustain without organizational commitment. Plants that achieve lasting reductions share these practices: daily heat balance reporting at the shift engineer level, SHC as a formal KPI in operator performance reviews, regular cross-functional reviews involving process, maintenance, and procurement teams, and a capital project pipeline aligned with the diagnostic findings.</p><h2>Conclusion</h2><p>Reducing specific heat consumption is fundamentally a management discipline supported by engineering knowledge. The technical levers are well understood — the differentiating factor is systematic measurement, prioritized action, and operational consistency. Plants that embed SHC improvement into their daily management system consistently outperform peers by 50–100 kcal/kg over a 3–5 year horizon.</p>";
        authorName = "Eng. Carlos Mendes";
        category = #EnergyOptimization;
        metaDescription = "Systematic guide to reducing specific heat consumption (SHC) in cement plants. Covers heat balance diagnostics, preheater optimization, combustion management, and cooler efficiency improvements.";
        featuredImageUrl = null;
        status = #published;
        publishDate = now - 1_800_000_000_000;
      },
    ];
  };
};
