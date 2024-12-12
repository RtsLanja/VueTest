import scheduleModel from "../models/scheduleModel.js";
import userScheduleModel from "../models/userScheduleModel.js";

//récupération des agendas de l'utilisateur
const getSchedules = async (req, res) => {
  const { user_id } = req.query;

  try {
    console.log("user_id : ", user_id);
    const schedules = await userScheduleModel.getUserSchedules(user_id);
    console.log("schedules" , schedules);
    res
      .status(200)
      .json({ message: "Agenda récupéré avec succès.", schedules: schedules });
  } catch (err) {
    console.error("Erreur serveur :", err);
    res.status(500).json({ message: "Erreur serveur." });
  }
};


//Creation de nouvelle agenda
const register = async (req, res) => {
  const { title, description, begin_date, end_date, user_id } = req.body;
  try {
    console.log("Données reçues :", req.body);
    const id = await scheduleModel.createSchedule(
      title,
      description,
      begin_date,
      end_date
    );
    console.log("id",id);
    if (id) {
      
      await userScheduleModel.createUserSchedule(user_id, id);
      res.status(201).json({ message: "Agenda créé avec succès.", id: id });
    } else res.status(500).json({ message: "Erreur serveur." });
  } catch (err) {
    console.error("Erreur serveur :", err);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

//Update de l'agenda
const UpdateShedule = async (req, res) => {
  const id = req.params.id;
  const { title, description, begin_date, end_date } = req.body;
  try {
    console.log("Données reçues :", req.body);
    const exist = await scheduleModel.getScheduleById(id);
    console.log("Exist?", exist);
    if (exist) {
      await scheduleModel.updateSchedule(
        id,
        title,
        description,
        begin_date,
        end_date
      );
      res.status(200).json({ message: "Agenda modifié avec succès.", id: id });
    } else {
      res.status(404).json({ message: "agenda non trouvé" });
    }
  } catch (err) {
    console.error("Erreur serveur :", err);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

//suppression de l'agenda
const DeleteUserSchedule = async (req, res) => {
  const id = req.params.id;

  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ error: 'ID invalide' });
  }
  try {
    console.log("Données à supprimer reçues :", id);
    const exist = await scheduleModel.getScheduleById(id);
    console.log("Exist?", exist,"id", exist[0].id);
    if (exist) {
      await userScheduleModel.DeleteSchedule(exist[0].id);
      res.status(204).json({ message: "Agenda supprimé avec succès.", id: id });
    } else {
      res.status(404).json({ message: "agenda non trouvé" });
    }
  } catch (err) {
    console.error("Erreur serveur :", err);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

export { getSchedules , register, UpdateShedule , DeleteUserSchedule};
