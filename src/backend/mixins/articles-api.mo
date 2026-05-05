import List "mo:core/List";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import ArticleLib "../lib/articles";
import AuthLib "../lib/auth";
import ArticleTypes "../types/articles";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  sessions : Map.Map<Text, Bool>,
  articles : List.List<ArticleTypes.ArticleInternal>,
  articlesById : Map.Map<Common.ArticleId, ArticleTypes.ArticleInternal>,
  nextArticleId : { var value : Nat },
) {

  // ── Read endpoints ──────────────────────────────────────────────────────────

  public query func getArticle(id : Common.ArticleId) : async ?ArticleTypes.Article {
    ArticleLib.getById(articlesById, id);
  };

  public query func getArticleBySlug(slug : Text) : async ?ArticleTypes.Article {
    ArticleLib.getBySlug(articles, slug);
  };

  public query func listArticles(filter : Common.ListArticlesFilter) : async ArticleTypes.ArticleListResult {
    ArticleLib.listArticles(articles, filter);
  };

  public query func searchArticles(searchTerm : Text) : async [ArticleTypes.Article] {
    ArticleLib.searchArticles(articles, searchTerm);
  };

  public query func getLatestArticles(n : Nat) : async [ArticleTypes.Article] {
    ArticleLib.getLatestArticles(articles, n);
  };

  public query func getPopularArticles(n : Nat) : async [ArticleTypes.Article] {
    ArticleLib.getPopularArticles(articles, n);
  };

  // ── Public mutating endpoint ────────────────────────────────────────────────

  public shared func incrementViewCount(id : Common.ArticleId) : async () {
    ArticleLib.incrementViewCount(articles, id);
  };

  // ── Admin write endpoints ───────────────────────────────────────────────────

  public shared ({ caller }) func createArticle(token : ?Text, input : ArticleTypes.CreateArticleInput) : async Common.ArticleId {
    let tokenValid = switch (token) { case (?t) AuthLib.isValidToken(sessions, t); case null false };
    if (not tokenValid and not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can create articles");
    };
    let id = nextArticleId.value;
    nextArticleId.value := id + 1;
    let now = Time.now();
    let article = ArticleLib.createNew(id, input, now);
    articles.add(article);
    articlesById.add(id, article);
    id;
  };

  public shared ({ caller }) func updateArticle(token : ?Text, input : ArticleTypes.UpdateArticleInput) : async () {
    let tokenValid = switch (token) { case (?t) AuthLib.isValidToken(sessions, t); case null false };
    if (not tokenValid and not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update articles");
    };
    let now = Time.now();
    switch (articlesById.get(input.id)) {
      case null Runtime.trap("Article not found");
      case (?article) {
        article.applyUpdate(input, now);
      };
    };
  };

  public shared ({ caller }) func deleteArticle(token : ?Text, id : Common.ArticleId) : async () {
    let tokenValid = switch (token) { case (?t) AuthLib.isValidToken(sessions, t); case null false };
    if (not tokenValid and not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can delete articles");
    };
    articlesById.remove(id);
    let remaining = articles.filter(func(a : ArticleTypes.ArticleInternal) : Bool { a.id != id });
    articles.clear();
    articles.append(remaining);
  };

  // ── Auth helpers ────────────────────────────────────────────────────────────

  /// Returns true if the caller has admin principal OR if the provided token is valid.
  public query ({ caller }) func isAdmin(token : ?Text) : async Bool {
    if (AccessControl.isAdmin(accessControlState, caller)) return true;
    switch (token) {
      case (?t) AuthLib.isValidToken(sessions, t);
      case null false;
    };
  };
};
