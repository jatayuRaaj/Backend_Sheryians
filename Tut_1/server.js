// server ko start krna iska kaam hai aur create krna app ka kaam hai 

const app = require('./src/app');

app.get("/", (req, res) => {
    res.send('<h1>Home Page</h1>');
})

app.post("/note", (req, res) => { // humko front end se data chahiye jo ki user ne bheja hoga aur wo humlog ko milega req se 
    console.log(req.body());

})
app.listen(3000, () => {
    console.log("server started successfully");
});