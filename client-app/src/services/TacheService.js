import http from "utils/http-common"
import AuthHeader from "./AuthHeader";

class TacheService {
  getAll(userId) {
    return http.get(`/tache/allTaches/${userId}`,{ headers: AuthHeader() })
  }
  filterData() {
    return http.get('/tache/allTachesByCriteria',{ headers: AuthHeader() })
  }
  getTacheById(tacheId) {
    return http.get(`/tache/tache/${tacheId}`,{ headers: AuthHeader() })
  }

  create(data,userId) {
    return http.post(`/tache/createTache/${userId}`, data,{ headers: AuthHeader() });
  }

  update(id,data){
      return http.put(`/tache/updateTache/${id}`,data,{ headers: AuthHeader() });
  }

  deleteTache(tacheId) {
      return http.delete(`/tache/deleteTache/${tacheId}`,{ headers: AuthHeader() });
  }
}
export default new TacheService();