import ImportLog from "../model/ImportLog.model.js";


// Controller to fetch import history logs with pagination
export const getImportLogs = async (req, res) => {
  const {page = 1, limit = 10} = req.query;

  const logs = await ImportLog.find()
    .sort({ timestamp: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  res.json(logs);
};
