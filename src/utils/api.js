// utils/api.js
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/users";

async function handleResponse(res) {
  let data;
  try {
    data = await res.json();
  } catch {
    data = {};
  }
  if (!res.ok) {
    const message = data?.error?.message || data?.message || "Terjadi kesalahan pada server";
    return { status: "error", message };
  }

  return {
    status: "success",
    message: data?.message || "Berhasil",
    data,
  };
}
export async function apiLogin(email, password) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });
  return handleResponse(res);
}
export async function apiRegister(username, email, password) {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
    credentials: "include",
  });
  return handleResponse(res);
}
export async function apiDashboard() {
  try {
    const res = await fetch(`${BASE_URL}/dashboard`, {
      method: "GET",
      credentials: "include",
    });

    if (res.status === 401) {
      return { status: "error", message: "Token tidak ditemukan. Silakan login ulang." };
    } else if (res.status === 403) {
      return { status: "error", message: "Token tidak valid atau sudah kedaluwarsa." };
    }

    return await handleResponse(res);
  } catch (error) {
    return { status: "error", message: error.message };
  }
}

export async function apiCheckAuth() {
  try {
    const res = await fetch(`${BASE_URL}/check-auth`, {
      method: "GET",
      credentials: "include",
    });

    if (res.status === 401) return { authenticated: false };
    const data = await handleResponse(res);
    return { authenticated: true, user: data.data?.user };
  } catch {
    return { authenticated: false };
  }
}
export async function apiUploadCheck() {
  try {
    const res = await fetch(`${BASE_URL}/upload`, {
      method: "GET",
      credentials: "include",
    });

    if (res.status === 401) {
      return { status: "error", message: "Token tidak ditemukan. Silakan login ulang." };
    } else if (res.status === 403) {
      return { status: "error", message: "Token tidak valid atau sudah kedaluwarsa." };
    }

    return await handleResponse(res);
  } catch (error) {
    return { status: "error", message: error.message };
  }
}

export async function apiUploadVideo(formData) {
  const API_URL = "http://localhost:4000/api/video/process";
  const res = await fetch(API_URL, {
    method: "POST",
    body: formData,
    credentials: "include",
  });
  return handleResponse(res);
}

export async function apiGetUserFolders() {
  try {
    const res = await fetch("http://localhost:4000/api/video/folders", {
      method: "GET",
      credentials: "include", // kirim cookie JWT
    });

    if (res.status === 401) {
      return { status: "error", message: "Token tidak ditemukan. Silakan login ulang." };
    } else if (res.status === 403) {
      return { status: "error", message: "Token tidak valid atau sudah kedaluwarsa." };
    }

    return await handleResponse(res);
  } catch (error) {
    return { status: "error", message: error.message };
  }
}

export async function apiGetFolderContents(folderName) {
  try {
    const res = await fetch(`http://localhost:4000/api/video/folders/${folderName}`, {
      method: "GET",
      credentials: "include",
    });

    if (res.status === 401) {
      return { status: "error", message: "Token tidak ditemukan. Silakan login ulang." };
    } else if (res.status === 403) {
      return { status: "error", message: "Token tidak valid atau sudah kedaluwarsa." };
    }

    return await handleResponse(res);
  } catch (error) {
    return { status: "error", message: error.message };
  }
}
