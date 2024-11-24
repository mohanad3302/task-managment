const board_model = require("../Schemas/board_model");

async function add_board(req,res){

    console.log(req.body);

    try {
        const board = req.body
        await board_model.create(board)
        res.status(201).json({message : "board created successfuly"})
    } catch (error) {
        res.status(500).json({message:error})
    }
}   

async function add_board_user(req,res){
    console.log(req.body);

    try {
        const {boardID , user} = req.body
        await board_model.updateOne(
            {boardID:boardID},
            {
                $addToSet :{
                    users:user
                }
            }
        )

        res.status(201).json({message:"user added to board"})
    } catch (error) {
        res.status(500).json({message:error})
    }
}

async function add_board_task(req,res){
    console.log(req.body);
    
    try {
        const {boardID , task} = req.body
        await board_model.updateOne(
            {boardID:boardID},
            {
                $addToSet :{
                    tasks:task
                }
            }
        )

        res.status(201).json({message:"task added to board"})
    } catch (error) {
        res.status(500).json({message:error})
    }
}
async function get_board(req,res) {
    console.log(req.body);
    const boardID = req.body.boardID
    try {
        const board = await board_model.aggregate([
            {
                $match : {boardID : boardID}
            },
            {
                $lookup:{
                    from :"users",
                    localField: "users",
                    foreignField:"_id",
                    as:"users"
                }
            },
            {
                $lookup:{
                    from:"tasks",
                    localField:"tasks",
                    foreignField:"_id",
                    as:"tasks"
                }
            }
            ,{
                $project:{
                    "users.username":1,
                    "tasks":1,
                    "boardID":1
                }
            }
        ])

        res.status(200).json(board)
    } catch (error) {
        res.status(500).json(error)
    }
}


module.exports = {
    get_board,
    add_board,
    add_board_user,
    add_board_task
}