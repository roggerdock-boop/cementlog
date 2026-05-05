import Map "mo:core/Map";
import Random "mo:core/Random";
import AuthLib "../lib/auth";

mixin (
  adminUsername : { var value : Text },
  adminPasswordHash : { var value : Text },
  sessions : Map.Map<Text, Bool>,
) {

  /// Login with username and password (password must be SHA-256 hex of the plaintext).
  /// Returns a session token on success.
  public shared func adminLogin(username : Text, passwordHash : Text) : async { #ok : Text; #err : Text } {
    if (username != adminUsername.value or passwordHash != adminPasswordHash.value) {
      return #err("Invalid username or password");
    };
    let randomBlob = await Random.blob();
    let token = AuthLib.blobToHex32(randomBlob);
    sessions.add(token, true);
    #ok(token);
  };

  /// Check whether a session token is currently active.
  public query func adminVerifyToken(token : Text) : async Bool {
    AuthLib.isValidToken(sessions, token);
  };

  /// Invalidate a session token (logout).
  public shared func adminLogout(token : Text) : async () {
    sessions.remove(token);
  };
};
