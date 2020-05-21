class View {
    _posts;
    _postTemplate;
    _user;
    _isSignedIn;

    constructor(user, isSignedIn) {
        this._posts = document.querySelector('.posts');
        this._postTemplate = document.querySelector('.post-template');
        this._user = user;
        this._isSignedIn = isSignedIn;
    }

    _showSinglePost(post) {
        let template = document.importNode(this._postTemplate.content, true);
        View.setPostInfo(post, template);
        this._posts.appendChild(template);
    }

    static setPostInfo(post, template) {
        template.firstElementChild.id = post.id;
        template.querySelector('.miaow').textContent = post.description;
        template.querySelector('.name').textContent = post.author;
        template.querySelector('.time').textContent = post.createdAt.toLocaleString();
        template.querySelector('.hashtag').textContent = '#' + post.hashtags.join(' #');
        template.querySelector('.like-amount').textContent = post.likes.length;
        if (post.author !== this._user) {
            template.querySelector('.delete-button').style.visibility = "hidden";
            template.querySelector('.edit-button').style.visibility = "hidden";
        }
    }

    _showSignOutButton() {
        if (!this._isSignedIn) {
            document.querySelector(".sign-out").style.visibility = "hidden";
        }
    }

    _showUsername() {
        document.querySelector(".profile-username").textContent = this._user;

    }

    _addButton() {
        if (!this._isSignedIn) {
            document.querySelector(".new-post-button").style.visibility = "hidden";
        }
    }

    refreshPage() {
        let tmp = this._posts.firstElementChild;

        while (tmp !== this._posts.lastElementChild) {
            tmp.remove();
            tmp = this._posts.firstElementChild;
        }

        tweets.getPage().forEach(post => this._showSinglePost(post));

        this._showSignOutButton();
        this._showUsername();
        this._addButton();
    }

    addPost(post) {
        if (tweets.add(post)) {
            this.refreshPage();

            return true;
        }

        return false;
    }

    editPost(id, post) {
        if (tweets.edit(id, post)) {
            this.refreshPage();

            return true;
        }

        return false;
    }

    removePost(id) {
        if (tweets.remove(id)) {
            this.refreshPage();

            return true;
        }

        return false;
    }
}

let tweets = new Model([
    {
        id: '1',
        description: 'I want some chips\ncan you get me some?',
        createdAt: new Date('2020-03-17T23:56:01'),
        author: 'sstrazdinaa',
        photoLink: 'https://sun9-38.userapi.com/c857324/v857324264/193d9e/D6FgjLo6BvM.jpg',
        hashtags: [
            'chips', 'love'
        ],
        likes: [
            'polCHO'
        ]
    },
    {
        id: '2',
        description: 'people think i\'m funny. but they haven\'t seen my saved vk. they\'d understand that i\'m incredibly funny!',
        createdAt: new Date('2020-03-22T20:26:00'),
        author: 'polCHO',
        photoLink: 'https://sun9-26.userapi.com/c854324/v854324906/224083/nJA3CCPp1LQ.jpg',
        hashtags: [
            'jokequeen', 'love'
        ],
        likes: [
            'sstrazdinaa'
        ]
    }
]);

let view;

window.onload = () => {
    let userName = 'cath.strazdina';

    view = userName.length == 0 ? new View('Guest', false) : new View(userName, true);

    view.refreshPage();
};