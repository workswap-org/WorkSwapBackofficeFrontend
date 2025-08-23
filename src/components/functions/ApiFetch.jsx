// apiClient.js
import { API_BASE } from "@/api/config";

let isRefreshing = false;
let refreshPromise = null;

async function refreshToken() {
    if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = fetch(`${API_BASE}/api/auth/refresh`, {
            method: "POST",
            credentials: "include",
        })
            .then(res => {
                if (!res.ok) throw new Error("Refresh failed");
                return res.json();
            })
            .then(data => {
                localStorage.setItem("accessToken", data.accessToken);
                return data.accessToken;
            })
            .finally(() => {
                isRefreshing = false;
            });
    }
    return refreshPromise;
}

export async function apiFetch(url, options = {}) {
    let token = localStorage.getItem("accessToken");

    const headers = {
        ...(options.headers || {}),
        Authorization: token ? `Bearer ${token}` : "",
    };
    console.log("headers: " + headers);

    let res = await fetch(`${API_BASE}${url}`, {
        ...options,
        headers,
        credentials: "include",
    });
    console.log("res: " + res);
    console.log("status: " + res.status);
    if (res.status === 401) {
        // accessToken expired → обновляем
        try {
            token = await refreshToken();
            const retryHeaders = {
                ...(options.headers || {}),
                Authorization: `Bearer ${token}`,
            };

            res = await fetch(`${API_BASE}${url}`, {
                ...options,
                headers: retryHeaders,
                credentials: "include",
            });
        } catch (e) {
            console.error("Не удалось обновить токен:", e);
            throw e;
        }
    }

    return res;
}