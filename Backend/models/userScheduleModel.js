import connection from "../database.js";

const getUserSchedules = async (id) => {
  const query = `
    SELECT a.id,a.title,a.description,DATE_FORMAT(a.begin_time, '%Y-%m-%d %H:%i') AS formatted_begin_date,DATE_FORMAT(a.end_time, '%Y-%m-%d %H:%i') AS formatted_end_date
    FROM agenda a 
    JOIN user_agenda ua ON a.id = ua.agenda_id 
    WHERE ua.user_id = ?;
  `;

  return new Promise((resolve, reject) => {
    connection.execute(query, [id], (err, results) => {
      if (err) {
        console.error("Erreur lors de l'exécution de la requête :", err);
        reject(err);
        return;
      }
      
      resolve(results);
    });
  });
};


const createUserSchedule = async (user_id, schedule_id) => {
  console.log("eto")
    const query =
      "INSERT INTO user_agenda (user_id , agenda_id) VALUES ( ?, ? )";

    const values = [user_id, schedule_id];

    connection.execute(query, values, (err, results) => {
      if (err) {
        console.error("Erreur lors de l'insertion :", err);
        return;
      }

      console.log("Nouvel agenda ajouté, ID :", results.insertId);
      return results.insertId;
    });
  };

  const DeleteSchedule = async (schedule_id) => {
    console.log("sc", schedule_id);
    const query = "DELETE FROM user_agenda WHERE agenda_id = ?";

    connection.execute(query, [schedule_id], (err, results) => {
      if (err) {
        console.error("Erreur lors de l'insertion :", err);
        return;
      }

      console.log("Suppréssion réusie ", results);
    });
  };

  export default { getUserSchedules, createUserSchedule, DeleteSchedule };