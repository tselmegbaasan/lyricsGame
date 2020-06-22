import http from "../http-common";


class LyricsDataService {
    getAll() {
        return http.get("/lyrics");
    }
    getByCategory(category) {
        return http.get(`/lyrics/${category}`);
    }
}

export default new LyricsDataService();