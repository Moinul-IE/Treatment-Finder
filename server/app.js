const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const ejsMate = require("ejs-mate");
const multer = require('multer');
const flash = require("connect-flash");
const passport =require("passport");
const LocalStrategy = require("passport-local");
const session = require('express-session');
const bodyParser = require('body-parser');






require('dotenv').config();
const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/treatment";


async function connectDB() {
    try {
        await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ MongoDB connected successfully!");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1); // stop server if DB fails
    }
}
connectDB();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));    // express find the views folder 
app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'your_secret_key', // Use a strong secret
    resave: false,
    saveUninitialized: false, // Don't save uninitialized sessions
    cookie: { secure: false } // Set to true if using HTTPS
}));






app.use(flash());
app.use(passport.initialize());
// Use email as the username field for authentication
passport.use(new LocalStrategy({ usernameField: 'email' }, Listing.authenticate()));

//testing
passport.serializeUser (Listing.serializeUser ());
passport.deserializeUser (Listing.deserializeUser ());


app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});



app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use('/fontawesome', express.static(path.join(__dirname, 'node_modules/@fortawesome/fontawesome-free')));

app.use(express.static(path.join(__dirname, "public"))); // static file in public folder

// ejs mate
app.engine("ejs", ejsMate);

// connect with mongoose 
// main().then(() =>{
//     console.log("connection Successfull")
// }).catch((err) =>{
//     console.log(err);
// });


async function main(){
     await mongoose.connect(MONGO_URL); // whatsapp is database 
}


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html')); // Adjust the path accordingly
});

// blog page api 
app.get('/blog', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'blog.html'));
});
// blogp1 post api
app.get('/blog/blogp1', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'blogp1.html'));
});

app.get('/blog/blogp2', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'blogp2.html'));
});

app.get('/blog/blogp3', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'blogp3.html'));
});


// about page api

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/userTarget', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'userTarget.html'));
});



// muter file handling 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/image'); // Directory to save uploaded images
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
    }
});

const upload = multer({ storage: storage });

// register 
// Register Doctor
app.post('/registerDoctor', upload.single('image'), async (req, res) => {
    try {
        // Debug logs
        console.log('Incoming registerDoctor request body:', req.body);
        console.log('Incoming registerDoctor file:', req.file);

        const { name, description, specialist, division, location, email, password, booking_amount, booking } = req.body;

        // Normalize booking amounts
        const bookingNew = Number(booking_amount?.new) || 0;
        const bookingOld = Number(booking_amount?.old) || 0;
        const bookingNum = Number(booking) || 0;

        if (!password) {
            console.error('No password provided for new doctor registration');
            req.flash('error_msg', 'Password is required');
            return res.redirect('/registerDoctor');
        }

        // Create new doctor instance (without password)
        const newDoctor = new Listing({
            name,
            description,
            specialist,
            division,
            location,
            email,
            image: req.file ? `/image/${req.file.filename}` : "/image/defaultimg.jpg",
            booking_amount: {
                new: bookingNew,
                old: bookingOld
            },
            booking: bookingNum
        });

        // ✅ Use passport-local-mongoose register method
        await Listing.register(newDoctor, password);

        console.log('New doctor saved:', newDoctor._id);
        req.flash('success_msg', 'Doctor registered successfully!');
        res.redirect('/Doctor'); // Redirect to doctor list page

    } catch (error) {
        console.error(error);

        // Handle duplicate email gracefully
        if (error.code === 11000 || error.name === 'MongoServerError') {
            req.flash('error_msg', 'An account with that email already exists.');
            return res.redirect('/registerDoctor');
        }

        res.status(500).send('Error registering doctor');
    }
});
// database testing perpose

// app.get("/testListing", async (req, res)=>{
//     let simpleLesting = new Listing({
//         name : "Dr . John Doe",
//         description : "MBBS of Bangladesh",
//         specialist : "hard",
//         division : "mymmensign",
//         location : "Dhaka",
//         booking_amount : {
//             new : 1000,
//             old : 500
//         },
//         booking : "01010202"

//     });

// await simpleLesting.save();
// console.log("data saved");
// res.send("Data saved");

// });

// Doctor api 

app.get("/Doctor", async (req, res) => {
    try {
        const allListing = await Listing.find({});
        res.render("listings/index", { allListing }); // Corrected line
    } catch (error) {
        console.error("Error fetching listings:", error);
        res.status(500).send("Internal Server Error");
    }
});

// per single doctor

app.get("/Doctor/:id", async (req, res) => {
    const { id } = req.params; // Extract the ID from the request parameters

    
    // Validate the ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
        // Fetch the doctor from the database
        const listing = await Listing.findById(id); // Assuming Listing is your model for doctors

        // Check if the doctor was found
        if (!listing) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        // Render the view and pass the doctor details to it
        res.render("listings/doctoruserShow", { listing }); // Pass the doctor object to the view
    } catch (error) {
        console.error("Error fetching doctor:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});



app.get('/search', async (req, res) => {
    const { location, hospital, specialist } = req.query;

    // Logic to query the database or API based on the filters
    const results = []; // Replace with actual search logic

    // Render the search results page
    res.render('listings/search', { results }); // Ensure the path is correct
});

// Search doctors API
app.post('/search/search-doctors', async (req, res) => {
    const { division, hospital, specialist } = req.body;

    try {
        // Build the query object based on provided filters
        const query = {};
        if (division) {
            query.division = division;
        }
        if (hospital) {
            query.location = hospital; // Assuming 'location' is the field for hospitals
        }
        if (specialist) {
            query.specialist = specialist; // Assuming 'specialist' is the field for specialists
        }

        // Query the database for matching doctors
        const results = await Listing.find(query);

        // Render the search results page and pass the results
        res.render('listings/searchResults', { results }); // Ensure the path is correct
        
    } catch (error) {
        console.error("Error searching doctors:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});







//Register
app.get('/registerDoctor', (req, res) => {
    res.render('listings/registerDoctor'); // Adjust the path as necessary
});

app.get('/login', (req, res)=>{
    res.render("listings/login");
});

// app.post('/login', passport.authenticate('local', {
//     successRedirect: '/userProfile', // Redirect to profile on success
//     failureRedirect: '/login', // Redirect back to login on failure
//     failureFlash: true // Enable flash messages for errors
// }));

app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err); // Error occurred during authentication
        }
        if (!user) {
            req.flash('error_msg', 'Invalid email or password.'); // Flash error message
            return res.redirect('/Doctor'); // Redirect back to login
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err); // Error occurred during login
            }
            return res.redirect('/Doctor'); // Redirect to profile on success
        });
    })(req, res, next);
});


app.get('/profile', isLoggedIn, async (req, res) => {
    try {
        const doctor = await Listing.findById(req.user._id); // Assuming req.user contains the logged-in user's info
        res.render('listings/userProfile', { doctor }); // Render the profile EJS file
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Middleware to check if user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login'); // Redirect to login if not authenticated
}

//searchbox
app.get('/searchbox', async (req, res) => {
    const query = req.query.query; // Get the search query from the request

    try {
        // Build the query object to search by name or specialist
        const results = await Listing.find({
            $or: [
                { name: { $regex: query, $options: 'i' } }, // Search by name (case insensitive)
                { specialist: { $regex: query, $options: 'i' } } // Search by specialist (case insensitive)
            ]

        });

        // Render the search results page and pass the results
        res.render('listings/searchbox', { results }); // Ensure the path is correct
    } catch (error) {
        console.error("Error searching doctors:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


// Route to render the contact page

// Health check endpoint (useful for platform load balancers and monitoring)
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{ console.log(`Server is running on port ${PORT}`); });