Create database

use mongo_practice


Create collection in database

db.createCollection(‘movies’)

Insert documents into movies collection

db.movies.insert({ title : 'Fight Club', writer : 'Chuck Palahniuk', year : 1999, actors : ['Brad Pitt', 'Edward Norton'] });

db.movies.insert({ title : 'Pulp Fiction', writer : 'Quentin Tarantino', year : 1994, actors : ['John Travolta', 'Uma Thurman'] });

db.movies.insert({ title : 'Inglorious Basterds', writer : 'Quentin Tarantino', year : 2009, actors : ['Brad Pitt', 'Diane Kruger', 'Eli Roth'] });

db.movies.insert({ title : 'The Hobbit: An Unexpected Journey', writer : 'J.R.R. Tolkien', year : 2012, franchise : 'The Hobbit' });

db.movies.insert({ title : 'The Hobbit: The Desolation of Smaug', writer : 'J.R.R. Tolkien', year : 2013, franchise : 'The Hobbit' });

db.movies.insert({ title : 'The Hobbit: The Battle of the Five Armies', writer : 'J.R.R. Tolkien', year : 2012, franchise : 'The Hobbit', synopsis : 'Bilbo and Company are forced to engage in a war against an array of combatants and keep the Lonely Mountain from falling into the hand of a rising darkness.' });

db.movies.insert({ title : 'Pee Wee Herman\'s Big Adventure' });

db.movies.insert({ title : 'Avatar' });


Query all documents

db.movies.find();


Query all documents with writer ‘Quentin Tarantino’

db.movies.createIndex({ writer : 'text' });
db.movies.find({ $text : {$search : 'Quentin Tarantino' } } );


Query all document where actors include ‘Brad Pitt’

b.movies.createIndex({ name : 'text'});
db.movies.find({ actors : 'Brad Pitt' });


Query all documents with franchise ‘The Hobbit’

db.movies.createIndex({ franchise : 'text' });
db.movies.find({ franchise : 'The Hobbit' })


Get all movies released in the 90s

db.movies.find({ year : {$gt : 1989, $lt : 2000} } );


Get all movies released before 2000 or after 2010

db.movies.find({ $or: [ { year: {$lt : 2000} }, {year : {$gt : 2010}} ] });


Add a synopsis to ‘The Hobbit: An Unexpected Journey’

db.movies.update({ title : 'The Hobbit: An Unexpected Journey'}, {$set : {synopsis : 'A reluctant hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home - and the gold within it -from the dragon, Smaug.'} } );


Add a synopsis to ‘The Hobbit: The Desolation of Smaug’

db.movies.update({ title : 'The Hobbit: The Desolation of Smaug'}, {$set : { synopsis : 'The dwarves, along with Bilbo Baggins and Gandalf the Grey, continue their quest to reclaim Erebor, their homeland, from Smaug.  Bilbo Baggins is in possession of a mysterious and magical ring.'} } );


Add ‘Samuel L. Jackson’ to ‘Pulp Fiction’

db.movies.update({ title : 'Pulp Fiction'}, {$set : { actors : 'Samuel L. Jackson' } } );
  -this overwrites

db.movies.update({ title : 'Pulp Fiction'}, {$set : { actors : ['John Travolta', 'Uma Thurman', 'Samuel L. Jackson'] } } );


Find all movies that have a synopsis containing ‘Bilbo’

db.movies.find({$text : {$search : 'Bilbo'} } );


Find all movies with ‘Gandalf’ in the synopsis

db.movies.find({$text : {$search : 'Gandalf'} } );


Find all movies with ‘Bilbo’ and NOT ‘Gandalf’

db.movies.find({$text : {$search : 'Bilbo - Gandalf'} } );


Find all movies with ‘dwarves’ OR ‘hobbit

db.movies.find({$text : {$search : 'dwarves hobbit'} } );


Find all movies that have a synopsis that contains the word "gold" and “dragon"

db.movies.find({$text : {$search : 'gold + dragon'} } );

or

db.movies.find({$text : {$search : '\'gold\' dragon'} } );


delete the movie "Pee Wee Herman's Big Adventure"

db.movies.remove( { title : 'Pee Wee Herman\'s Big Adventure' } );


delete the movie “Avatar"

db.movies.remove({ title : 'Avatar' });


Create new ‘users’ collection

db.createCollection(‘users');


Insert documents into users

db.users.insert({ username : 'GoodGuyGreg', first_name : 'Good Guy', last_name : 'Greg' });
db.users.insert({ username : 'ScumbagSteve', full_name : { first : 'Scumbag', last : 'Steve' } } );


Create ‘posts’ collection

db.createCollection(‘posts');


Insert documents into posts

db.posts.insert({ username : 'GoodGuyGreg', title : 'Passes out at party', body : 'Wakes up early and cleans house' });

db.posts.insert({ username : 'GoodGuyGreg', title : 'Steals your identity', body : 'Raises your credit score' });

db.posts.insert({ username : 'GoodGuyGreg', title : 'Reports a bug in your code', body : 'Sends you a Pull Request' });

db.posts.insert({ username : 'ScumbagSteve', title : 'Borrows something', body : 'Sells it' });

db.posts.insert({ username : 'ScumbagSteve', title : 'Borrows everything', body : 'The end' });

db.posts.insert({ username : 'ScumbagSteve', title : 'Forks your repo on github', body : 'Sets to private' });


Create ‘comments’ collection

db.createCollection(‘comments');


Insert documents into comments

var borrowsSomethingCursor = db.posts.find({ username : 'GoodGuyGreg' });
var borrowsSomething = borrowsSomethingCursor.next();
borrowsSomething._id

db.comments.insert({ username : 'GoodGuyGreg', comment : 'Hope you got a good deal!', post : borrowsSomething._id });


var borrowsEverythingCursor = db.posts.find({ username : 'GoodGuyGreg' });
var borrowsEverything = borrowsEverythingCursor.next();
borrowsEverything._id

db.comments.insert({ username : 'GoodGuyGreg', comment : 'What\'s mine is yours!', post : borrowsEverything._id });


var forksYourRepoOnGithubCursor = db.posts.find({ username : 'GoodGuyGreg' });
var forksYourRepoOnGithub = forksYourRepoOnGithubCursor.next();
forksYourRepoOnGithub._id

db.comments.insert({ username : 'GoodGuyGreg', comments : 'Don't violate the licensing agreement!', post : forksYourRepoOnGithub._id });


var passesOutAtPartyCursor = db.posts.find({ username : 'ScumbagSteve' });
var passesOutAtParty = passesOutAtPartyCursor.next();
passesOutAtParty._id

db.comments.insert({ username : 'ScumbagSteve', comment : 'It still isn\'t clean', post : passesOutAtParty._id });


var reportsABugInYourCodeCursor = db.posts.find({ username: 'ScumbagSteve' });
var reportsABugInYourCode = reportsABugInYourCodeCursor.next();
reportsABugInYourCode._id

db.comments.insert({ username : 'ScumbagSteve', comment : 'Denied your PR cause I found a hack', post : reportsABugInYourCode._id });


Find all users

db.users.find()


Find all posts

db.posts.find()


Find all posts authored by ‘GoodGuyGreg’

db.posts.find({ username : ‘GoodGuyGreg’ })


Find all posts authored by ‘ScumbagSteve’

db.posts.find({ username : ‘ScumbagSteve’ });


Find all comments
db.comments.find()


Find all comments authored by ‘GoodGuyGreg’

db.comments.find({ username : 'GoodGuyGreg' });


Find all comments authored by ‘ScumbagSteve’

db.comments.find({ username : 'ScumbagSteve' });


Find all comments belonging to post ‘Reports a bug in your code’

db.comments.find({ post : reportsABugInYourCode._id });