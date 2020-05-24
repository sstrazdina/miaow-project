drop database if exists MiaowApp;
create database if not exists MiaowApp;
use MiaowApp;

drop table if exists USER;

create table if not exists USER (
	USER_ID bigint not null primary key,
    NAME varchar(200) not null unique
)
engine = InnoDB;

drop table if exists POST;

create table if not exists POST (
	POST_ID bigint not null primary key,
	USER_ID bigint not null,
	DESCRIPTION varchar(200) not null,
	CREATED_AT datetime not null,
	PHOTO_LINK varchar(255) default null,
    LIKES int default null,
    constraint USER_ID foreign key (USER_ID)
    REFERENCES USER(USER_ID)
)
engine = InnoDB;

drop table if exists TAGS_LIST;

create table if not exists TAGS_LIST (
	TAG_ID int not null primary key,
    TAG varchar(45) not null
)
engine = InnoDB;

drop table if exists TAGS_POST;

create table if not exists TAGS_POST (
	POST_ID bigint,
    TAD_ID int,
    constraint POST_ID foreign key (POST_ID)
    references POST(POST_ID),
    constraint TAG_ID foreign key (TAG_ID)
    references TAGS_LIST(TAG_ID)
)
engine = InnoDB;

insert into USER
values
(1, 'sstrazdinaa'),
(2, 'polCHO'),
(3, 'gribochek'),
(4, 'uwagagrey'),
(5, 'ya_ne_kurila'),
(6, 'nohomo_onlykiry'),
(7, 'andreika.69'),
(8, 'dreamteam_famcs'),
(9, 'eraztuna'),
(10, 'arrr.kudrrr');

insert into POST
values
(1, 1, 'вот бы я так тянулась к знаниям, как мой кот к оливкам', '2020-02-19T15:08:23', 'https://sun9-30.userapi.com/WOBp6al63kO_bphfFoc1Q9l_Pt1NtEaOI-4YYg/Afco8wm4tBk.jpg', 3),
(2, 9, 'Мир полон чудес и шуток про суицид', '2020-05-25T23:08:23', null, 10),
(3, 1, 'заканчивай, любви нет', '2020-02-06T20:17:23', null, 12),
(4, 2, 'если ты мне друг, сделай на полную звук', '2020-05-18T04:16:00', null, 5),
(5, 6, 'голову кружит, ай, до упаду', '2020-04-26T13:00:27', null, 6),
(6, 4, 'настроение: смотреть фотки студенчества родителей, все-таки картошка это романтично', '2020-01-06T9:03:50', null, 6),
(7, 1, 'все што я умею делоть в жизне это дышать', '2020-04-10T06:17:00', null, 8),
(8, 3, 'хочется заснуть и проснуться, когда эта пандемия закончится', '2020-05-11T23:57:03', null, 16),
(9, 7, 'продуктивность помидора и энергетика камня', '2020-03-09T03:56:29', null, 21),
(10, 5, 'день-п*здень', '2020-01-30T19:23:14', null, 3);

insert into TAGS_LIST
values
(1, 'life'),
(2, 'toxic'),
(3, 'lost'),
(4, 'удаленка'),
(5, 'love'),
(6, 'mistakes');

insert into TAGS_POST
values
(10, 1),
(1, 2),
(1, 5),
(3, 6),
(8, 3),
(6, 4),
(5, 6);