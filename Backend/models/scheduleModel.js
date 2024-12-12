import connection from "../database.js";

const getSchedules = async () => {
  const query = "SELECT * FROM schedule;";

  connection.execute(query, (err, results) => {
    if (err) {
      console.error("Erreur lors de l'insertion :", err);
      return;
    }

    console.log("Résultats de la requête :", results);
    return results;
  });
};
const getScheduleById = (id) => {
  const query = "SELECT * FROM agenda WHERE id = ?;";

  return new Promise((resolve, reject) => {
    connection.execute(query, [id], (err, results) => {
      if (err) {
        console.error("Erreur lors de la requête :", err);
        return reject(err); 
      }

      console.log("Résultats de la requête :", results);
      resolve(results); 
    });
  });
};

const createSchedule = async (title, description, begin_date, end_date) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO agenda (title, description, begin_time, end_time) VALUES (?, ?, ?, ?)";
    const values = [title, description, begin_date, end_date];

    // Exécuter la requête INSERT
    connection.execute(query, values, (err, results) => {
      if (err) {
        console.error("Erreur lors de l'insertion :", err);
        return;
      }

      console.log("Nouvel agenda ajouté, ID :", results.insertId);
      resolve(results.insertId);
    });
  });
};

const updateSchedule = async (id, title, descrption, begin_date, end_date) => {

  const query =
    "UPDATE agenda SET title = ? , description = ? , begin_time = ? , end_time = ? WHERE id = ?";

  const values = [title, descrption, begin_date, end_date, id];

  connection.execute(query, values, (err, results) => {
    if (err) {
      console.error("Erreur lors de l'insertion :", err);
      return;
    }

    console.log("Modification réusie");
  });
};
const DeleteSchedule = async (id) => {

  const query = "DELETE FROM agenda WHERE id_schedule = ?";

  connection.execute(query, [id], (err, results) => {
    if (err) {
      console.error("Erreur lors de l'insertion :", err);
      return;
    }

    console.log("Suppréssion réusie ", results);
  });
};

export default { getScheduleById, createSchedule, updateSchedule };
