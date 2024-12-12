import { Router } from "express";
import { authMiddleware} from "../middlewares/authMiddleware.js"
import {
  getSchedules,
  register,
  UpdateShedule,
  DeleteUserSchedule,
} from "../controllers/scheduleController.js";

const router = Router();

router.get("/agendas",authMiddleware, getSchedules);
router.post("/agendas",authMiddleware, register);
router.put('/agendas/:id', authMiddleware, UpdateShedule);
router.delete('/agendas/:id', authMiddleware, DeleteUserSchedule);

export default router;
