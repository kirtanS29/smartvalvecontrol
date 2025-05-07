const API_BASE_URL = "http://localhost:5000/api/auth";

export const signup = async (userData) => {
    console.log("Sending signup data:", JSON.stringify(userData, null, 2)); // Debug request data
    try {
        const response = await fetch(`${API_BASE_URL}/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        console.log(" Signup API Response:", data); // Debug response

        if (!response.ok) {
            throw new Error(data.message || "Signup failed");
        }

        return data;
    } catch (error) {
        console.error(" Signup error:", error);
        return { message: "Something went wrong" };
    }
};

export const login = async (userData) => {
    console.log("Sending login data:", userData);

    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: userData.username, // ✅ Use 'username' instead of 'name'
                password: userData.password,
            }),
        });

        const data = await response.json();
        console.log("Login response:", data);

        if (!response.ok) {
            throw new Error(data.message || "Login failed");
        }

        return data;
    } catch (error) {
        console.error("Login error:", error);
        return { message: error.message || "Something went wrong" };
    }
};

