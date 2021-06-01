const router = require("express").Router();
const Task = require("../models/Task");

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).send({ tasks });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.get("/task/:id",async(req,res) =>{
    const id = req.params.id
    try {
        const task = await Task.find({id});
        if (!task){ throw Error("Not Found")}
        res.status(302).send({ task });
      } catch (err) {
        console.log(err);
        res.status(404).send(err);
      }
})

router.post("/add-task", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).send({task})
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.patch("/update-task/:id", async(req,res)=>{
    const updates = Object.keys(req.body)
    const id = req.params.id
    try {
        const task = await Task.find({id})
        updates.forEach((update) => {
            task[update] = req.body[update]
        })
        await req.task.save()
        res.status(200).send({task})
    } catch (err) {
        res.status(400).send(err)
    }
})

router.delete("/delete-task/:id", async (req, res) => {
    const id = req.params.id
  try {
    await Task.findByIdAndRemove(id);
    res.stauts(202).send({message:'Task deleted'})
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

module.exports = router;
