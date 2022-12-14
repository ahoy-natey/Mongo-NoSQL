const { User, Thought } = require('../models');
const reactionSchema = require('../models/Reaction');


module.exports = {
    // get all users

    getThought(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // Get single Thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that Id' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Create Thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => res.json(thought))
            .catch((err) => {
                return res.status(500).json(err);
            });


    },
    // Delete a Thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No Thought with that ID' })
                    : thought.deleteMany({ _id: { $in: thought.thoughts } })
                //   ASK ABOUT THIS
            )
            .then(() => res.json({ message: 'Thought deleted!' }))
            .catch((err) => res.status(500).json(err));
    },
    // Update a course
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((reaction) =>
            !reaction
            ? res.status(404).json({ message: 'No reaction with this id!' })
            : res.json(reaction)
    )
    .catch((err) => res.status(500).json(err));
},
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            { $pull: { reactions: {reactionId: req.params.reactionId} } },
            { runValidators: true, new: true }
            )
            .then((reaction) =>
            !reaction
            ? res.status(404).json({message: 'Hmm cant delete'})
            : reaction.deleteMany({_id: {$in: reaction.reactions}}))
            .then(() => res.json({ message: 'Thought deleted!' }))
            .catch((err) => res.status(500).json(err));
    }

}