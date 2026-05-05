module {
  public type ArticleId = Nat;
  public type Timestamp = Int;

  public type Category = {
    #RawMill;
    #CementMill;
    #Kiln;
    #AFR;
    #EnergyOptimization;
  };

  public type ArticleStatus = {
    #published;
    #draft;
  };

  public type SortBy = {
    #date;
    #viewCount;
  };

  public type ListArticlesFilter = {
    category : ?Category;
    status : ?ArticleStatus;
    sortBy : SortBy;
    page : Nat;
    pageSize : Nat;
  };
};
