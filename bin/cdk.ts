#!/usr/bin/env node

import { App, Construct, Stack, StackProps } from '@aws-cdk/core';
import { Vpc } from '@aws-cdk/aws-ec2';

const app = new App();

export interface MyStackProps extends StackProps {
  cidr: string;
}

export class MyStack extends Stack {
  public constructor(scope: Construct, id: string, props: MyStackProps) {
    super(scope, id, props);

    new Vpc(this, 'vpc-name', {
      maxAZs: 12,
      cidr: props.cidr,
    });
  }
}

new MyStack(app, 'mystack', {  
  cidr: '10.101.1.0/24'
});
