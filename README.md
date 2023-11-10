# <a href='https://cluey.pt'>Cluey-App</a>
Cluey App for Mobile

![Cover](/public/screenshots/Cover.png)
![Web](/public/screenshots/phone.png)

### Future Features
- Add responsive to all components on left menu.
- Add New Cluey chat button and function.
- When no chat selected, show footer input to tapy message and create a new chat, to default chat with cluey bot, but can change target message changed a person or group.

### Known Issues
- Need click 2x to sign in/sign up

### Future Directs Chats Features
- When offline status, don't loading news chats received
- When away status, don't mark as received on friend chat but loading news chats
- When busy status, don't mark as read on friend chat but loading news chats
- When online status, mark as received on friend chat and loading news chats
- When open chat, mark as read on friend chat
- When marked as not read, marl as not read on friend chat and mark read on user chat with diferent icon or color

### Web App
- [x] api
  - [x] country-picker *function* *component* *@*
  - [x] firebase *function* *context* *@*
    - [x] config *function*
  - [x] openai *function* // voice text *working*
  - [x] providers *function* *working*
  
- [x] components // structure *working* *@*
  - [x] global *component* *deprecied*
  - [x] locale *function* *context* 
    - [x] portugues *json* *working* 
    - [x] spanish *json* *working* *translating* 
    - [x] french *json* *working* *translating*
    - [x] english *json* *working* *translating*
  - [x] theme *function* 
    - [x] light *pallet*
    - [x] dark *pallet* *working*
  - [x] tools *function* *deprecied*

- [x] Home *@*
  - [x] Loading *index* 
  - [x] Chat *@*
    - [x] Hearder *working*
      - [x] Count
    - [x] Content
      - [X] Presets
        - [x] Suggests *working* 
      - [x] Plans 
        - [x] Free
        - [x] Info
        - [x] Personal
        - [x] Pro
      - [X] Messages 
        - [x] Message
          - [x] Response
          - [x] Request
    - [X] Footer 
      - [x] Info *working*
      - [x] Input
      - [x] Actions *working*
        - [X] Search *working* 
        - [X] Tools *working* 
  - [x] "Menu" *@*
    - [x] Hearder // Responsive *working* *@*
    - [x] Content *@*
      - [x] Chats *@*
        - [X] Item 
      - [x] Contacts *@*
        - [x] Direct 
          - [X] Item 
        - [x] People 
          - [x] Person 
          - [x] Search 
        - [x] Directs 
          - [x] Item 
      - [X] Node *working*
      - [X] Tasks *working*
      - [X] Auto *working*
      - [X] Settings // Theme *working* // Language // Logout // About *working* *@*
      - [X] User *@*
        - [X] Email *working* 
        - [X] Password *working* 
        - [X] Preferences 
        - [X] Profile 

- [x] Auth *@*
  - [x] Login
  - [x] Register
  - [x] Forgot Password
  - [x] Confirm Email

- [x] Utils
  - [ ] About
  - [x] components *components* *working*
  - [ ] Rules 
  - [x] Working *@*

- [x] components *components* *@*
  - [x] AlertBox *components*
  - [x] Language *components*
  - [x] PatchNotes *components*
  - [x] Preferences *components*
  - [x] ThemeSwitch *components* 

- [x] functions *functions* *@*
  - [x] hover *functions*
  - [x] navigate *functions*
  - [x] patchnote *functions*

> #### Install
> <code>git clone https://github.com/ClueyAi/Cluey-App.git</code>
> 
> <code>cd Cluey-App</code>
> 
> <code>yarn install</code> / <code>npm install</code>
> 
> <code>yarn start</code> / <code>npm start</code>

# Future implementations:

## 1. Read Mark System

I would add a record to the database, within each user, to check if they are logged in. If YES: (I would check if the user's status is online, if YES: I would mark it as received [single blue V], if NO: I would mark it as not received [single gray V].) If NO: I would mark it as not received [single gray V ].

I would add a chat opening record, to compare the date of the last opening with the date of the last message, and mark the messages prior to the last opening as read. If the user is in status, offline, away or busy, it would not be marked as read, but rather as received. However, you would also not be able to see the reading status of sent messages, while you are in these statuses.

It requires complex logic to function correctly, which is why this functionality has been postponed to a future version.

## 2. Notification System

Currently, there is already a status record for the notification system on/off buttons, recording the value in the database. You would just need to create a function to switch according to the registry value. Using native libraries for each platform, to access notifications, and in the case of a new installation, and the registry value is on, check this upon loading and request the necessary access to the resource. If it is off, just ask for access, when using the button to change the value to on.

It is not an essential feature for this phase of the project, which is why it was postponed to a future version.

## 3. Streaming Response System

Currently, the AI's response is recorded in the database, and then displayed... For this system to work, it would be necessary to display the message in real time, with a native functionality of the OpenAI API, to display the response in streaming, and not just when the AI has finished responding. But when the response is completed, then register it in the database, and then replace the message in real time with the message registered in the database.

However, there is a complexity involved in processing the streaming message, which is why this functionality was postponed to a future version.

## 5. Credit Accounting System

It is currently working symbolically, making a standard addition of 10,000 interaction credits for any user upon registration, and then subtracting 1 credit for each interaction. For this system to work as it should, it would need an accurate accounting system, to ensure that no errors occur, since the credits will have a real value, and there cannot be any failures, which will generate unfair situations, or manual changes.

However, there is a complexity involved in processing the streaming message, which is why this functionality was postponed to a future version.

## 6. System Administration System

Currently, done manually in the database, there are values, saved in variables, which are interpreted by the system, to perform functions external to users, which will be accessed by system administrators, at different levels.

Currently, these features are available to administrators:
#### Functions
- forceLogoutAll(bool) // Force logout of all users, in extreme cases of changes to the system or database.

#### Information
- displayName(string) // Cluey
- photoURL(string) // Photo that will be displayed on the AI Cluey profile
- uid(string) // Unique ID, randomly generated for the Cluey AI profile
- userName(string) // Username, which will be displayed on the AI Cluey profile

#### Status
- server(bool) // Cluey AI status, to know if it is online or offline
- newUpdate(bool) // Update status, to know if there is a new update available

#### Patch Notes
- documents with information about system updates, in an array, to be listed for users, when a new update is available, with a unique id for each update. Thus marking based on the ID, as read, so that the user does not receive the same update again, and also so that the user can see previous updates, if they wish.

All these functionalities would be managed by another application, which accesses the same database, to make the necessary changes, as well as accounting and managing credits, and offering support to users.

However, to achieve this, this level of management, with an interface entirely dedicated to administrator users, was postponed to a future version. For obvious reasons.

#### SAVE

credits: {
     total: credits,
     payments: [{
       name: 'Free - Beta Test',
       price: 0,
       cycle: 'month',
       method: 'gift',
       amount: credits,
       createdAt: timestamp,
     }],
     history: [{
       amount: credits,
       createdAt: timestamp,
     }],
   },
