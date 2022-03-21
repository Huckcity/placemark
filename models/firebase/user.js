class User {
  constructor(id, username, email, role) {
    this._id = id;
    this.username = username;
    this.email = email;
    this.role = role;
  }

  // Convert object to map and return it
  toMap() {
    const map = new Map();
    map.set("_id", this._id);
    map.set("username", this.username);
    map.set("email", this.email);
    map.set("role", this.role);
    return map;
  }
}
