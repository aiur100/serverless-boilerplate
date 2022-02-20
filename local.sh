#!/bin/bash
export AWS_DEFAULT_OUTPUT="json"
export AWS_PAGER=
export AWS_URL="http://localhost:4566"

case $1 in
    up)
        docker-compose up -d
        sls package --stage 'local'
        aws cloudformation create-stack \
                                --endpoint-url $AWS_URL \
                                --stack-name local-stack \
                                --template-body file:///$PWD/.serverless/cloudformation-template-create-stack.json \
                                --parameters ParameterKey=Parm1,ParameterValue=test1 ParameterKey=Parm2,ParameterValue=test2 #> /dev/null 2>&1
        aws cloudformation update-stack \
                                --endpoint-url $AWS_URL \
                                --stack-name local-stack \
                                --template-body file:///$PWD/.serverless/cloudformation-template-update-stack.json \
                                --parameters ParameterKey=Parm1,ParameterValue=test1 ParameterKey=Parm2,ParameterValue=test2 #> /dev/null 2>&1
        npm run local-serve
        #npm run dev && cd vue-app && npm run dev
        #cd vue-app && npm run dev &
        ;;
    down)
        aws cloudformation delete-stack \
                            --endpoint-url $AWS_URL \
                            --stack-name local-stack
        docker-compose down
        ;;
    *)
        echo don\'t know
        ;;
esac