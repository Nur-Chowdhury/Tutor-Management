import mongoose from 'mongoose';
import Notification from './Notification.js';

const adSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    topics: [{
        type: String,
    }],
    slug: {
        type: String,
        required: true,
    },
    booked: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    accepted: {
        type: Boolean,
        default: false,
    },
    interested: [{
        type: String,
    }],
},{ timestamps: true }
);

adSchema.methods.toggleInterest = async function(id) {
    const index = this.interested.indexOf(id);
    if (index === -1) {
        this.interested.push(id);
        await Notification.create({
            userId: this.userId,
            adId: this._id,
            message: 'A tutor is interested in your ad.',
        });
    } else {
        this.interested.splice(index, 1);
        await Notification.findOneAndDelete({
            userId: this.userId,
            adId: this._id,
            message: 'A tutor is interested in your ad.',
        });
    }
    await this.save();
} 

const Ad = mongoose.model('Ad', adSchema);
export default Ad;