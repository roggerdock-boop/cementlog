import Map "mo:core/Map";
import Text "mo:core/Text";

module {

  // Default admin credentials.
  // The frontend must send passwords as SHA-256 hex strings (lowercase).
  // SHA-256("admin123") = 240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9
  public let DEFAULT_ADMIN_USERNAME : Text = "admin";
  public let DEFAULT_ADMIN_PASSWORD_HASH : Text = "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9";

  private let HEX : [Char] = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];

  /// Convert the first 16 bytes of a Blob to a 32-char lowercase hex string (session token).
  public func blobToHex32(b : Blob) : Text {
    let bytes = b.toArray();
    var result = "";
    var i = 0;
    for (byte in bytes.vals()) {
      if (i >= 16) return result;
      let hi = (byte >> 4).toNat();
      let lo = (byte & 0x0f).toNat();
      result := result # Text.fromChar(HEX[hi]) # Text.fromChar(HEX[lo]);
      i += 1;
    };
    result;
  };

  /// Returns true if the token exists in the active sessions map.
  public func isValidToken(
    sessions : Map.Map<Text, Bool>,
    token : Text,
  ) : Bool {
    switch (sessions.get(token)) {
      case (?true) true;
      case _ false;
    };
  };
};
