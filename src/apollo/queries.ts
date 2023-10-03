import { gql } from '@apollo/client/core';

export const GET_USER = gql`
    query User($username: String) {
        student(username: $username) {
            id
            name
            username
            password
        }
    }
`;

export const CREATE_USER = gql`
    mutation CreateUser($name: String!, $username: String!, $password: String!) {
        addStudent(name: $name, username: $username, password: $password) {
            id
            name
            username
            password
        }
    }
`;