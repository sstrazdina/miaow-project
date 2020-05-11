class PostCollection {
    _posts = [];

    constructor(posts) {
        this._posts = posts.concat();
    }

    getPage(skip = 0, top = 10, filterConfig = undefined) {
        if (filterConfig) {
            let requiredPosts = this._posts;
            for (let param in filterConfig) {
                if (param === 'author') {
                    requiredPosts = requiredPosts.filter(post => post.author.includes(filterConfig.author));
                } else if (param === 'dateFrom') {
                    requiredPosts = requiredPosts.filter(post => post.createdAt > filterConfig.dateFrom);
                } else if (param === 'dateTo') {
                    requiredPosts = requiredPosts.filter(post => post.createdAt <= filterConfig.dateTo);
                } else if (param === 'hashtags') {
                    requiredPosts = requiredPosts.filter(function (post) {
                        for (let i = 0; i < filterConfig.hashtags.length; i++) {
                            if (post.hashtags.some(hashtag => hashtag.includes(filterConfig.hashtags[i]))) {
                                return true;
                            }
                        }
                    });
                }
            }
            requiredPosts.sort((a, b) => a.createdAt - b.createdAt);
            return requiredPosts.slice(skip, skip + top);
        }
        let requiredPosts = this._posts.sort((a, b) => a.createdAt - b.createdAt);
        return requiredPosts.slice(skip, skip + top);
    }

    get(id) {
        return this._posts.find(post => post.id === id) || null;
    }

    static validate(post) {
        if (!post.description || typeof post.description !== 'string' || post.description.length > 200)
            return false;
        if (post.photoLink && typeof post.photoLink !== 'string')
            return false;
        if (post.hashtags) {
            if (!post.hashtags.every(tag => typeof tag === 'string'))
                return false;
        }
        return true;
    }

    add(post) {
        if (PostCollection.validate(post)) {
            const date = new Date();
            const id = date;
            const author = 'user' + id;
            post.createdAt = date;
            post.id = id;
            post.author = author;
            this._posts.push(post);
            return true;
        } else return false;
    }

    edit(id, post) {
        if (post.description) {
            if (typeof post.description !== 'string' || post.description.length > 200)
                return false;
        }
        if (post.photoLink) {
            if (typeof post.photoLink !== 'string')
                return false;
        }
        if (post.hashtags) {
            if (!post.hashtags.every(tag => typeof tag === 'string'))
                return false;
        }
        let editPost = this.get(id);
        for (let param in post) {
            editPost[param] = post[param];
        }
        return true;
    }

    remove(id) {
        if (typeof id === 'string') {
            let index = this._posts.findIndex(post => post.id === id);
            if (index !== -1) {
                this._posts.splice(index, 1);
                return true;
            }
        }
        return false;
    }

    addAll(posts) {
        let invalidPosts = [];
        posts.forEach(post => {
            if (!this.add(post)) invalidPosts.push(post);
        });
        return invalidPosts;
    }

    clear() {
        this._posts = [];
    }
}

let posts = new PostCollection([
    {
        id: '1',
        description: 'people think i\'m funny. but they haven\'t seen my saved vk. they\'d understand that i\'m incredibly funny!',
        createdAt: new Date('2020-03-31T11:27:56'),
        author: 'polCHO',
        photoLink: 'https://sun9-30.userapi.com/WOBp6al63kO_bphfFoc1Q9l_Pt1NtEaOI-4YYg/Afco8wm4tBk.jpg',
        hashtags: [
            'party', 'yes_ss', 'memes', 'jokequeen'
        ],
        likes: [
            'andreika.69',
            'sstrazdinaa',
            'nohomo_onlykiry'
        ]
    },

    {
        id: '2',
        description: 'Hey, check out my new telegram chanal!' +
            'Sad songs and ways to deal with mutherf*ckers and don\'t commit suicide too soon' +
            'love y\'all!',
        createdAt: new Date('2020-03-26T23:01:29'),
        author: 'uwagagrey',
        photoLink: 'https://sun9-10.userapi.com/c543107/v543107974/5aa55/7lNc3DdLcVo.jpg',
        hashtags: [
            'music', 'photography'
        ],
        likes: [
            'andreika.69',
            'sstrazdinaa',
            'polCHO'
        ]
    },

    {
        id: '3',
        description: 'I want some chips\n' +
            'can you get me some?',
        createdAt: new Date('2020-03-30T04:31:00'),
        author: 'sstrazdinaa',
        photoLink: 'https://sun9-63.userapi.com/-JgokoMD3xq01u5n-F3Yio9yMlbkLVMJmJQ1ow/kQQCI0L--6w.jpg',
        hashtags: [
            'exhausted', 'life',
        ],
        likes: [
            'polCHO',
            'ya_ne_kurila'
        ]
    },

    {
        id: '4',
        description: 'Буду честен, я не люблю отвечать на сообщения. Но работать я тоже не люблю. Я люблю только Сашу...',
        createdAt: new Date('2020-03-29T16:24:05'),
        author: 'andreika.69',
        photoLink: 'https://sun9-22.userapi.com/c7003/v7003970/7e1b2/phn_cztAcEg.jpg',
        hashtags: [
            'work', 'hate', 'life'
        ],
        likes: [
            'polCHO',
            'uwagagrey'
        ]
    },

    {
        id: '5',
        description: 'the script is almost done. Get ready for a new shortfilm',
        createdAt: new Date('2020-03-06T19:58:45'),
        author: 'pilipipchik',
        photoLink: 'https://sun9-59.userapi.com/c7005/v7005475/76578/mNikpvSwnEU.jpg',
        hashtags: [
            'film', 'montage'
        ],
        likes: [
            'ya_ne_kurila'
        ]
    },

    {
        id: '6',
        description: 'is it possible to feel more depressed? need events intravenously asap!',
        createdAt: new Date('2020-03-23T10:18:01'),
        author: 'sstrazdinaa',
        photoLink: 'https://sun9-60.userapi.com/c540100/v540100395/58ba0/K1A4tfR5EZA.jpg',
        hashtags: [
            'events', 'birthday', 'yes_ss', 'фпми50', 'organization', 'quarantine'
        ],
        likes: [
            'ya_ne_kurila',
            'polCHO',
            'andreika.69'
        ]
    },

    {
        id: '7',
        description: 'i\'ll make an aesthetically pleasing insta for you',
        createdAt: new Date('2020-03-31T08:27:51'),
        author: 'ya_ne_kurila',
        photoLink: 'https://sun9-56.userapi.com/bB86cqwlrDBOSX-vSW5XWVbtcb9dU91fZfLSdA/GCzCXYmMGXU.jpg',
        hashtags: [
            'instagram', 'aesthetics', 'smm', 'yes_ss'
        ],
        likes: [
            'andreika.69',
            'philipipchik'
        ]
    },

    {
        id: '8',
        description: 'have you seen my cat? oh, he\'s just eating. again...',
        createdAt: new Date('2020-03-31T03:29:51'),
        author: 'gribochek',
        photoLink: 'https://sun9-18.userapi.com/c855424/v855424206/1af060/-UjeCB4MyKQ.jpg',
        hashtags: [
            'cat', 'home'
        ],
        likes: [
            'polCHO',
            'sstrazdinaa'
        ]
    },

    {
        id: '9',
        description: 'домашка :(',
        createdAt: new Date('2020-04-01T22:19:01'),
        author: 'nohomo_onlykiry',
        photoLink: 'https://sun9-6.userapi.com/c854532/v854532176/1c227c/CD85JgKgSOc.jpg',
        hashtags: [
            'school', 'homework'
        ],
        likes: [
            'polCHO',
            'sstrazdinaa',
            'arrr.kudrrr'
        ]
    },

    {
        id: '10',
        description: 'Who\'s up for improvised Tonight in evebody\'s home?',
        createdAt: new Date('2020-03-01T02:09:34'),
        author: 'arrr.kudrrr',
        photoLink: 'https://sun9-32.userapi.com/c851420/v851420045/1f6e44/j3-VgwY1FUc.jpg',
        hashtags: [
            'tonight', 'party', 'OK16'
        ],
        likes: [
            'polCHO',
            'nohomo_onlykiry'
        ]
    },

    {
        id: '11',
        description: 'Somebody once told me the world is gonna roll me',
        createdAt: new Date('2020-04-01T09:37:00'),
        author: 'sstrazdinaa',
        photoLink: 'https://sun9-63.userapi.com/c543109/v543109391/2b9ac/ghsy3ITrLlA.jpg',
        hashtags: [
            'life', 'iconic'
        ],
        likes: [
            'polCHO',
            'uwagagrey'
        ]
    },

    {
        id: '12',
        description: 'хочу танцевать под безумие на афтере мисс',
        createdAt: new Date('2020-04-03T23:51:28'),
        author: 'polCHO',
        photoLink: 'https://sun9-26.userapi.com/c7003/v7003581/7145c/oqWUvV6eUhg.jpg',
        hashtags: [
            'yes_ss', 'lofi', 'afterparty'
        ],
        likes: [
            'sstrazdinaa',
            'philipipchik'
        ]
    },

    {
        id: '13',
        description: 'Пока ты читаешь этот текст, я сделала все задачи по алгоритмам.',
        createdAt: new Date('2020-04-02T16:02:13'),
        author: 'eraztuna',
        photoLink: 'https://sun2.velcom-by-minsk.userapi.com/c540100/v540100191/7cfa2/NMw6BVFkhjw.jpg',
        hashtags: [
            'smartaf', 'workBitch'
        ],
        likes: [
            'sstrazdinaa',
            'philipipchik',
            'polCHO',
            'arrr.kudrrr'
        ]
    },

    {
        id: '14',
        description: 'I\'m inspired by memes.',
        createdAt: new Date('2020-04-02T20:12:42'),
        author: 'sstrazdinaa',
        photoLink: 'https://sun9-63.userapi.com/c854024/v854024009/1c6e5c/YDoxEWFiEKY.jpg',
        hashtags: [
            'memes', 'inspiration'
        ],
        likes: [
            'philipipchik',
            'polCHO',
            'gribochek'
        ]
    },

    {
        id: '15',
        description: 'если ты не подписан на мою инсту, то мне тебя жаль :(',
        createdAt: new Date('2020-03-31T18:46:23'),
        author: 'dreamteam_famcs',
        photoLink: 'https://sun9-11.userapi.com/XRsZl9K-ue5zcVgdlz6el3U9P7hlL5WuR6pR7g/Bj1XK5KbCQo.jpg',
        hashtags: [
            'insta', 'follow4follow'
        ],
        likes: [
            'philipipchik',
            'polCHO'
        ]
    },

    {
        id: '16',
        description: 'Я рассортировала иконки по цветам)',
        createdAt: new Date('2020-03-31T18:46:23'),
        author: 'sstrazdinaa',
        photoLink: 'https://sun9-31.userapi.com/c858324/v858324735/160b98/4xCfCnXioTQ.jpg',
        hashtags: [
            'icons', 'iphone'
        ],
        likes: [
            'philipipchik',
            'sstrazdinaa'
        ]
    },

    {
        id: '17',
        description: 'смотри мой новый тик-ток',
        createdAt: new Date('2020-03-24T13:40:10'),
        author: 'nohomo_onlykiry',
        photoLink: 'https://sun9-64.userapi.com/c540100/v540100876/626d0/shybFbUpkmw.jpg',
        hashtags: [
            'tiktok', 'famous'
        ],
        likes: [
            'eraztuna'
        ]
    },

    {
        id: '18',
        description: 'задумалась о будущем - испортила все утро',
        createdAt: new Date('2020-04-03T08:15:10'),
        author: 'sstrazdinaa',
        photoLink: 'https://sun9-22.userapi.com/c813024/v813024496/c038/iQiK7pcZmL0.jpg',
        hashtags: [
            'life'
        ],
        likes: [
            'eraztuna',
            'ya_ne_kurila',
            'dreamteam_famcs'
        ]
    },

    {
        id: '19',
        description: 'деловой как орган половой',
        createdAt: new Date('2020-04-01T19:42:50'),
        author: 'uwagagrey',
        photoLink: 'https://sun9-20.userapi.com/nph3m8WUOCqWomTfnkezsGbhnCZmnUG3ngrIUA/4SxjgWe6R04.jpg',
        hashtags: [
            'winner', 'boss'
        ],
        likes: [
            'ya_ne_kurila',
            'dreamteam_famcs'
        ]
    },

    {
        id: '20',
        description: 'we\'re yellow',
        createdAt: new Date('2020-04-01T19:42:50'),
        author: 'arrr.kudrrr',
        photoLink: 'https://sun9-52.userapi.com/c857236/v857236653/189d4c/wLghIFM2YM0.jpg',
        hashtags: [
            'yellow', 'trueColors'
        ],
        likes: [
            'eraztuna',
            'philipipchik'
        ]
    },
]);

//Testing
console.log("Top 5 posts:");
console.log(posts.getPage(0, 5));

console.log("Top 5 posts, skip 1 posts, hashTag: ss, life (auto sort by created date):");
console.log(posts.getPage(1, 5, {hashtags: ['ss', 'life']}));

console.log("Top 2 posts, skip 0 posts, author sstrazdinaa:");
console.log(posts.getPage(0, 2, {author: 'sstrazdin'}));

console.log("Get post with id 1:");
console.log(posts.get('1'));

console.log("Get post with id 116 (non existent):");
console.log(posts.get('116'));

console.log("Get post with wrong input:");
console.log(posts.get(2));

console.log("Validating post 1:");
console.log(PostCollection.validate(posts.get('1')));

console.log("Add new post with correct parameters:");
posts.add({description: 'keep calm and be happy', hashtags: ['life']});
console.log(posts.getPage(20, 22));

console.log('Add post with wrong parameters:');
console.log(posts.add({description: '', hashtags: ['', 12]}));

console.log('Edit post');
posts.edit('20', {description: 'we\'re blue', hashtags: ['blue', 'sad']});
console.log(posts.get('20'));

console.log('Edit post with wrong info');
posts.edit('20', {description: 'we\'re blue.', hashtags: ['blue', 13]});
console.log(posts.get('20'));

console.log('Add array of posts');
console.log(posts.addAll([
    {
        description: 'That\'s a valid post',
        hashtags: [
            'testing'
        ],
        likes: [
            'sstrazdinaa', 'eraztuna'
        ]
    },

    {
     description: '',
     hashtags: [
         'invalid'
     ]
    },

 {
  description: 'That\'s an invalid post',
  hashtags: [
      'test', true
  ]
 }
]));

console.log('Clear everything and attempt to get posts');
posts.clear();
console.log(posts.getPage());