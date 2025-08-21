import bcrypt from 'bcrypt';
import { agentModel } from "../models/agent.model.js";
import { Response } from "../utils/response.util.js";

export const getAgents = async (req, res) => {
  try {
    const agents = await agentModel.find().select('-password').sort({ createdAt: -1 });
    if(!agents) return Response(404, false, "Not found", res);
    
    Response(200, true, "All Agents", res, agents);
  } catch (error) {
    console.log(error);
    Response(500, false, "Server error", res);
  }
};

export const getAgentById = async (req, res) => {
  try {
    const agent = await agentModel.findById(req.params.id).select('-password');
    if(!agent) return Response(404, false, "Not found", res);
    
    Response(200, true, "Agent", res, agent);
  } catch (error) {
    console.log(error);
    Response(500, false, "Server error", res);
  }
};

export const createAgent = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    if (!name || !email || !mobile || !password) return Response(400, false, "All fields are required", res);

    const existingAgent = await findOne({ email });
    if (existingAgent) return Response(400, false, "Agent already exits", res);

    const hashPassword = await bcrypt.hash(password, 10);
    const agent = await agentModel.create({
      name,
      email,
      mobile,
      password: hashPassword
    });

    Response(201, true, "Agent created", res, agent);
  } catch (error) {
    console.log(error);
    return Response(500, false, "Server error", res);
  }
};

export const updateAgent = async (req, res) => {
  try {
    const { name, email, mobile, isActive } = req.body;
    
    const agent = await agentModel.findById(req.params.id);
    if (!agent) return Response(404, false, "Not found", res);

    if (name) agent.name = name;
    if (email) agent.email = email;
    if (mobile) agent.mobile = mobile;
    if (typeof isActive === 'boolean') agent.isActive = isActive;

    await agent.save();

    Response(200, true, "Agent updated", res);
  } catch (error) {
    console.log(error);
    return Response(500, false, "Server error", res);
  }
};

export const deleteAgent = async (req, res) => {
  try {
    const agent = await agentModel.findById(req.params.id);
    if (!agent) return Response(404, false, "Not found", res);

    await agentModel.findByIdAndDelete(req.params.id);

    Response(200, true, "Agent deleted", res);
  } catch (error) {
    console.log(error);
    return Response(500, false, "Server error", res);
  }
};