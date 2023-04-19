import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

export const createComment = async (req, res) => {
  try {
    const { postId, comment } = req.body;

    if (!comment)
      return res.json({ message: "Коментарі не можуть бути пустим" });
		const newComment = new Comment({comment})
		await newComment.save()
		try{
			await Post.findByIdAndUpdate(postId,{
				$push:{comments: newComment._id}
			})
		}catch (error){
			console.log(error)
		}

		res.json(newComment)
  } catch (error) {
    res.json({
      message: "Щось пішло не так!",
    });
  }
};


export const getAllComments = async(req,res)=>{
	try{
		const allCommets= await Comment.find()
		res.json(allCommets)

	} catch(error) {
		res.json({
		  message: "Щось пішло не так!",
		});
	 }
}