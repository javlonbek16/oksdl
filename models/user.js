class User {
    constructor(username, password, id, image, subs) {
        this.username = username;
        this.password = password;
        this.id = id;
        this.image = image;
        this.subs = subs;
    }
}

module.exports = User;