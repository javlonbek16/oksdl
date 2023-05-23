class Video {
    constructor(id, user_id, name, date, title, likes, dizlikes, views){
        this.id = id;
        this.user_id = user_id;
        this.name = name;
        this.date = date;
        this.title = title;
        this.likes = likes;
        this.dizlikes = dizlikes;
        this.views = views;
    }
}

module.exports = Video;