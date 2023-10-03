import { writable, type Writable } from "svelte/store";
import type { Student } from "./interfaces";

export const title: Writable<string> = writable('Welcome');
export const loggedInUser: Writable<Student> = writable({ __typename: "Student", id: 0, name: "", username: "", password: "" });