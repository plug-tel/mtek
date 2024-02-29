import http from "utils/http-common"

class TacheService {
  getAll() {
    return http.get('/allTache')
  }

  getTacheById(tacheId) {
    return http.get(`/tache/${tacheId}`)
  }

  create(data) {
    return http.post('/createTache', data);
  }

  update(id,data){
      return http.put(`/updateTache/${id}`, data);
  }

  deleteTache(tacheId) {
      return http.delete(`/deleteTache/${tacheId}`);
  }
}
export default new TacheService();