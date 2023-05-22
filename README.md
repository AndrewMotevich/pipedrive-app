# Pipedrive-app
Custom aplication for pipedrive crm.

This app allow you to create a new deal.

Functionality:
- Get list of deals
- Create new deal
- Use ui (UI modal window)
***
# Features:
- ### React
- ### TypeScript
- ### [MUI](https://mui.com/)
- ### [Pipedrive node client](https://github.com/pipedrive/client-nodejs)
- ### [Pipedrive SDK](https://github.com/pipedrive/app-extensions-sdk)
- ### Vite and vitest with SSR
- ### NodeJs
- ### Express
- ### Vercel
***
# Preview:
![image](https://github.com/AndrewMotevich/pipedrive-app/assets/101500007/d93e09c7-b9bd-4c2e-b1b5-05df6cb6e1b9)
## Main page with deals list
![image](https://github.com/AndrewMotevich/pipedrive-app/assets/101500007/2503cd67-2d98-4e36-b3d8-63977b715cbe)
## Form page where you can add new deal
![image](https://github.com/AndrewMotevich/pipedrive-app/assets/101500007/3e1883df-1be5-4305-b928-96f77357b664)
## Example of deals fields
![image](https://github.com/AndrewMotevich/pipedrive-app/assets/101500007/a9c81956-d0ab-4cee-af57-a277b5735e97)
## UI modal window of main page with deals
![image](https://github.com/AndrewMotevich/pipedrive-app/assets/101500007/5221641b-ca2f-4dc9-b92b-8e390374fe97)
## UI modal window with form
***
# Instalation
1. Fork this repository
2. Make deployment
3. Create new sandbox account in Pipedrive CRM
- [https://developers.pipedrive.com/](https://developers.pipedrive.com/)
4. Create new app 
- Add name and callback Url (you can use localhost:PORT/api/callback, but you cant implement UI modal window)
![image](https://github.com/AndrewMotevich/pipedrive-app/assets/101500007/4925a812-71d1-4025-aff1-31b6164ead97)
- Add permissions
![image](https://github.com/AndrewMotevich/pipedrive-app/assets/101500007/b5e51de8-5d8c-4fe6-a1ce-a7cda783658a)
- Copy Clien ID, Client secret, Callback Url to api/index.ts 
![image](https://github.com/AndrewMotevich/pipedrive-app/assets/101500007/80c0f6cf-03b5-4778-b37b-a064dfab05b4)
![image](https://github.com/AndrewMotevich/pipedrive-app/assets/101500007/4b428ad4-c449-4723-afde-b6ba1ed6335e)
- Install application and enjoy
# UI modal window instalation

<details>
  <summary>Note</summary>
Work only with deployment. Not with localhost:PORT
</details>

1. In application settings add new modal window

![image](https://github.com/AndrewMotevich/pipedrive-app/assets/101500007/e441ff25-ca01-4c63-8895-eb670524e687)

2. Setup new modal window

![image](https://github.com/AndrewMotevich/pipedrive-app/assets/101500007/4841c5bb-33fc-4a15-b2ec-53bb29072f18)
