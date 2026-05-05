import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import ArticleLib "lib/articles";
import ArticleTypes "types/articles";
import AuthLib "lib/auth";
import Common "types/common";
import ArticlesMixin "mixins/articles-api";
import AuthMixin "mixins/auth-api";

actor {
  // ── Authorization state ─────────────────────────────────────────────────────────
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // ── Object storage ────────────────────────────────────────────────────────────
  include MixinObjectStorage();

  // ── Admin credentials ─────────────────────────────────────────────────────────
  let adminUsername = { var value : Text = AuthLib.DEFAULT_ADMIN_USERNAME };
  let adminPasswordHash = { var value : Text = AuthLib.DEFAULT_ADMIN_PASSWORD_HASH };

  // ── Session token store ────────────────────────────────────────────────────────
  let sessions = Map.empty<Text, Bool>();

  // ── Auth API ────────────────────────────────────────────────────────────────
  include AuthMixin(adminUsername, adminPasswordHash, sessions);

  // ── Article state ──────────────────────────────────────────────────────────────
  let articles = List.empty<ArticleTypes.ArticleInternal>();
  let articlesById = Map.empty<Common.ArticleId, ArticleTypes.ArticleInternal>();
  let nextArticleId = { var value : Nat = 0 };

  // ── Seed sample articles on first init ──────────────────────────────────────────
  do {
    let samples = ArticleLib.sampleArticles();
    let now = Time.now();
    let seedViews : [Nat] = [150, 120, 85];
    for ((i, input) in samples.enumerate()) {
      let id = nextArticleId.value;
      nextArticleId.value := id + 1;
      let article = ArticleLib.createNew(id, input, now);
      article.viewCount := if (i < seedViews.size()) seedViews[i] else 50;
      articles.add(article);
      articlesById.add(id, article);
    };
  };

  // ── Articles API ──────────────────────────────────────────────────────────────
  include ArticlesMixin(accessControlState, sessions, articles, articlesById, nextArticleId);
};
