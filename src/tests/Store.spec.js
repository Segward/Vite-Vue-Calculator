import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import axios from "axios";
import Contact from "../components/Contact.vue";
import store from "../Store";

vi.mock("axios");

describe("Vuex Store", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Contact, {
      global: {
        plugins: [store],
      },
    });
  });

  it("should add user data to db.json", async () => {
    const randomNumber = Math.floor(Math.random() * 100000000) + 1;
    const email = `john.doe${randomNumber}@example.com`;
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
    wrapper.find("#name").setValue("John Doe");
    wrapper.find("#email").setValue(email);
    wrapper.find("#message").setValue("This is a test message.");
    await wrapper.find("form").trigger("submit.prevent");
    expect(alertSpy).toHaveBeenCalledWith("Form submitted successfully!");
    try {
      const response = await axios.get("http://localhost:3000/users");
      expect(response.status).toBe(200);
      const user = response.data.find((user) => user.email === email);
      expect(user).toBeTruthy();
      expect(user.name).toBe("John Doe");
      expect(user.message).toBe("This is a test message.");
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    alertSpy.mockRestore();
  });
});
