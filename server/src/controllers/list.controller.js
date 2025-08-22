import { promises as fs } from "fs";
import { agentModel } from "../models/agent.model.js";
import { listModel } from "../models/list.model.js";
import { processCSV } from "../utils/csv.util.js";
import { Response } from "../utils/response.util.js";

export const uploadAndDistribute = async (req, res) => {
  try {
    if (!req.file) return Response(404, false, "File Not found", res);

    const agents = await agentModel.find({ isActive: true }).limit(5);
    if (agents.length === 0) {
      await fs.unlink(req.file.path);
      return Response(404, false, "Not found", res);
    }

    const filePath = req.file.path;
    const items = await processCSV(filePath);

    if (items.length === 0) {
      await fs.unlink(filePath);
      return Response(
        404,
        false,
        "CSV file is empty or contains no valid data",
        res
      );
    }

    const distributions = distributeItems(items, agents);

    const list = await listModel.create({
      fileName: req.file.originalname,
      uploadedBy: req.user.id,
      totalItems: items.length,
      distributions,
      status: "distributed",
    });

    await list.populate("distributions.agent", "name email");
    await list.populate("uploadedBy", "email");

    await fs.unlink(filePath);

    Response(201, true, "List saved", res, list);
  } catch (error) {
    console.error(error);
    return Response(500, false, "Server error", res);
  }
};

export const getDistributions = async (req, res) => {
  try {
    const lists = await listModel
      .find()
      .populate("distributions.agent", "name email")
      .populate("uploadedBy", "email")
      .sort({ createdAt: -1 });

    if (!lists) return Response(404, false, "Not found", res);

    Response(200, true, "All list", res, lists);
  } catch (error) {
    console.error(error);
    return Response(500, false, "Server error", res);
  }
};

export const getDistributionById = async (req, res) => {
  try {
    const list = await listModel.findById(req.params.id)
      .populate("distributions.agent", "name email mobile")
      .populate("uploadedBy", "email");

    if (!list) return Response(404, false, "Not found", res);

    Response(200, true, "Lists", res, list);
  } catch (error) {
    console.log(error);
    return Response(500, false, "Server error", res);
  }
};

export const deleteDistribution = async(req, res) =>{
  try {
    const response = await listModel.findByIdAndDelete(req.params.id);
    if(!response) Response(404, false, "Not found", res);

    Response(200, true, "Deleted", res);
  } catch (error) {
    console.log(error);
    Response(500, false, "Server error", res)
  }
}

const distributeItems = (items, agents) => {
  const distributions = [];
  const itemsPerAgent = Math.floor(items.length / agents.length);
  const remainingItems = items.length % agents.length;

  let currentIndex = 0;

  agents.forEach((agent, index) => {
    const assignedCount = itemsPerAgent + (index < remainingItems ? 1 : 0);
    const agentItems = items.slice(currentIndex, currentIndex + assignedCount);

    distributions.push({
      agent: agent._id,
      items: agentItems,
      assignedCount,
    });

    currentIndex += assignedCount;
  });

  return distributions;
};
