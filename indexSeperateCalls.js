const express = require('express');
const mockData = require('./MOCK_DATA.json');
const PORT = 8000;
const app = express();


//Routes
app.get('/api/recipies', (req, res) => {
    return res.json(mockData);
});

app.get('/recipies', (req, res) => {
    const html = `
    <ul>
    ${mockData.map(rBlog => `<li>${rBlog.blog_name}</li>`).join("")}
    </ul>
    `
    res.send(html)
});

app.get('/api/recipies/:id', (req, res) => {
    const ID = Number(req.params.id);
    const blog = mockData.find((b) => b.id === ID);
    return res.json(blog)
});
app.get('/api/recipies/name/:blog_name', (req, res) => {
    const name = req.params.blog_name;
    const blog = mockData.find((b) => b.blog_name === name);
    return res.json(blog)
});
app.post('api/recipies/:id', (req, res) => {
    return res.json({status:'pending'});     
});
app.delete('api/recipies/:id', (req, res) => {
    return res.json({status:'pending'});     
     
});
app.patch('api/recipies/:id', (req, res) => {
    return res.json({status:'pending'});     
     
});
app.listen(PORT, () => console.log('Server started!!!!!!!!!'));
