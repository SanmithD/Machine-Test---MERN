import { Schema, model } from 'mongoose';

const listItemSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number']
  },
  notes: {
    type: String,
    trim: true,
    default: ''
  }
});

const listSchema = new Schema({
  fileName: {
    type: String,
    required: true
  },
  uploadedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  totalItems: {
    type: Number,
    required: true
  },
  distributions: [{
    agent: {
      type: Schema.Types.ObjectId,
      ref: 'Agent',
      required: true
    },
    items: [listItemSchema],
    assignedCount: {
      type: Number,
      required: true
    }
  }],
  status: {
    type: String,
    enum: ['processing', 'distributed', 'completed'],
    default: 'processing'
  }
}, {
  timestamps: true
});

export const listModel = model('List', listSchema);
