import Common "common";

module {
  public type ArticleId = Common.ArticleId;
  public type Category = Common.Category;
  public type ArticleStatus = Common.ArticleStatus;
  public type Timestamp = Common.Timestamp;

  /// Internal mutable article record
  public type ArticleInternal = {
    id : ArticleId;
    var title : Text;
    var slug : Text;
    var content : Text;
    var excerpt : Text;
    var authorName : Text;
    var category : Category;
    var metaDescription : Text;
    var featuredImageUrl : ?Text;
    var status : ArticleStatus;
    var publishDate : Timestamp;
    var lastUpdated : Timestamp;
    var viewCount : Nat;
  };

  /// Immutable shared article record for public API boundary
  public type Article = {
    id : ArticleId;
    title : Text;
    slug : Text;
    content : Text;
    excerpt : Text;
    authorName : Text;
    category : Category;
    metaDescription : Text;
    featuredImageUrl : ?Text;
    status : ArticleStatus;
    publishDate : Timestamp;
    lastUpdated : Timestamp;
    viewCount : Nat;
  };

  /// Input type for creating an article
  public type CreateArticleInput = {
    title : Text;
    slug : Text;
    content : Text;
    excerpt : Text;
    authorName : Text;
    category : Category;
    metaDescription : Text;
    featuredImageUrl : ?Text;
    status : ArticleStatus;
    publishDate : Timestamp;
  };

  /// Input type for updating an article
  public type UpdateArticleInput = {
    id : ArticleId;
    title : Text;
    slug : Text;
    content : Text;
    excerpt : Text;
    authorName : Text;
    category : Category;
    metaDescription : Text;
    featuredImageUrl : ?Text;
    status : ArticleStatus;
    publishDate : Timestamp;
  };

  /// Paginated articles response
  public type ArticleListResult = {
    articles : [Article];
    total : Nat;
    page : Nat;
    pageSize : Nat;
  };
};
