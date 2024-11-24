const task_model = require("../Schemas/task_model")

async function create_task (req , res) {
    console.log(req.body);

    try{
        const data = req.body;
        await task_model.create(data.newTask)
        res.status(201).json({message:"task created successfuly"})
    }
    catch(error){
        res.status(500).json({message:error})
    }
}

async function get_all_tasks(req,res){
    console.log(req.body);

    try{
        tasks = await task_model.aggregate([
            {
                $lookup:{
                    from:"users",
                    localField:"assignee",
                    foreignField:"_id",
                    as:"assignee"
                },
            },
            {
                $unwind: {
                    path: "$assignee",
                    preserveNullAndEmptyArrays: true // Keep tasks without assignees
                }
            },
            {
                $project:{
                    "_id":1,
                    "title":1,
                    "status":1,
                    "estimate":1,
                    "tags":1,
                    "assignee":"$assignee.username" 
                }
            }
        ]);
        res.status(200).json({tasks:tasks})
    }catch(error){
        console.log(error)
        res.status(500).json({message:error})
    }
}

async function update_task(req,res){

    console.log(req.body.editedTask)
    try{
        const {_id, title , status,tags, estimate , assigne} = req.body.editedTask
        await task_model.updateOne(
            {_id : _id},
            {
                $set:{
                    title : title,
                    tags : tags,
                    status:status,
                    estimate:estimate,
                    assigne : assigne
                }
            }
        )

        res.status(201).json({message:"task updated"})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:error})
    }

}
module.exports = {
    create_task,
    get_all_tasks,
    update_task
}