<template>
    <div>
        <HomeButton />
        <v-container>
            <v-card v-if="user" class="ma-auto" style="max-width: 650px;">
                <v-img :src="user.picture.large" height="300px" alt="User Picture"></v-img>
                <div class="d-flex justify-center ma-2">

                    <v-btn color="blue-accent-1" :to="`/user/${user.login.uuid}/chat`">
                        <v-icon left>mdi-email</v-icon>
                        MESSAGE
                    </v-btn>
                </div>
                <v-table>
                    <tbody>
                        <tr>
                            <td>name:</td>
                            <td><v-card-text>{{ user.name.first }} {{ user.name.last }}</v-card-text></td>
                        </tr>
                        <tr>
                            <td>gender:</td>
                            <td><v-card-text>{{ user.gender }}</v-card-text></td>
                        </tr>
                        <tr>
                            <td>age:</td>
                            <td><v-card-text>{{ user.dob.age }}</v-card-text></td>
                        </tr>
                        <tr>
                            <td>country:</td>
                            <td><v-card-text>{{ user.location.country }}</v-card-text></td>
                        </tr>
                        <tr>
                            <td>state:</td>
                            <td><v-card-text>{{ user.location.state }}</v-card-text></td>
                        </tr>
                        <tr>
                            <td>city:</td>
                            <td><v-card-text>{{ user.location.city }}</v-card-text></td>
                        </tr>
                        <tr>
                            <td>email:</td>
                            <td><v-card-text>{{ user.email }}</v-card-text></td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card>

            <p v-else>User not found</p>
        </v-container>
    </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import HomeButton from '@/components/button/HomeButton.vue';

const route = useRoute();
// @ts-ignore
const userId = route.params.id;

const userStore = useUserStore();
const user = userStore.users.find((user) => user.login.uuid === userId);
</script>