# SCA_Tournament_Manager

Welcome to the SCA Tournament Manager README document. Here's a quick overview of some essential
information about the SCA Tournament Manager project.

Some information Sturman has deemed essential:
https://docs.google.com/document/d/1K90yQdH8jT7MRap2XdlgYYklIc87Nl4VKRE1OezGb_4/edit?tab=t.0#heading=h.tym7s0gw96fv

Best practices:

    Coding Standards:
    
        golang:
    https://google.github.io/styleguide/go/guide
    https://google.github.io/styleguide/go/decisions
        AngularJS:
    https://angular.dev/style-guide#style-vocabulary

    Install the extension Prettier for VSCode HTML, CSS, and Javascript/Typescript formatting

        tldr;
        Use camelcase please

    Project Management:
        Repository/Code Management: github
        Project Tracker: trello
    
    Languages and database:
        Languages:  Angular JS, golang
        Database: mongoDB


Third-party resources:
    https://material.angular.io/components/input/overview
    https://material.angular.io/components/datepicker/overview
    https://material.angular.io/components/form-field/overview

How to initalize and run backend using Go

    Install go using go version to test if you have it. If not install it from Go's offical website https://go.dev/dl/

    Setup Environment Varibles file. This env file has the usename, password, and clustername of the mongodb database. Contact Yash Choksey for this information.

    Install all of the dependencies listed in the go.mod file. This can be done simply using the command "go mod tidy"

    Verify MongoDB access and make sure your IP address is whitelisted. If not contact a member of the team

    Run the backend using "go run". Make sure you are in the base directory when running this command

    
    Alternatively you can run the unit tests for the handlers by navigating to the handlers folder and running "go test"

