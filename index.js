const express = require('express');
const app = express();
const Article = require('./models/Article');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const articlesRoute = require('./routers/articles');
const authRoute = require('./routers/auth');
const Headlines = require('./models/Headlines');
const paymentRoute = require('./routers/paymentRoute');
mongoose.connect(process.env.MONGODB_URL).then(() => console.log('Database is connected to the server successfully!')).catch((error) => console.log(error));

app.get('/', (req, res) => {
    res.send('Welcome to National News Server.');
})

app.get('/news', async (req, res) => {

    // For adding initially articles data in mongodb from real production api

    // const response=await axios.get(`https://newsapi.org/v2/everything?q=$%7Bquery%7D&apiKey=${process.env.NEWS_API_KEY}`);
    // console.log(response.data.articles.length);
    // const data=response.data.articles;
    // for(let i=0;i<30;i++){
    //     let newArticle= new Article(data[i]);
    //     newArticle= await newArticle.save();
    //     console.log(newArticle);
    // }
    const response = await Article.find({});
    res.status(200).json(response);
});

app.use('/articles', articlesRoute);
app.use('/auth', authRoute);
app.use('/api', paymentRoute);

// For adding initially headlines data in mongodb from real production api

// app.get('/headlines', async(req, res)=>{
// const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`);
//     const length= response.data.articles.length;
//     const data= response.data.articles;
//     for(let i=0;i<length;i++){
//         let newHeadline= new Headlines(data[i]);
//         newHeadline= await newHeadline.save();
//     }
//     res.status(200).json(response.data);
// })


app.listen(9002, () => {
    console.log('Server is running on PORT 9002');
})