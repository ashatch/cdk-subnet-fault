import { expect, haveResource, countResources } from '@aws-cdk/assert';
import { App } from '@aws-cdk/core';
import { MyStack } from '../bin/cdk'


function initializeStack(cidr: string): MyStack {
  return new MyStack(new App(), 'Cdv2', {
    cidr: cidr
  });
}

test('Creates a /24 VPC with the correct subnets', (): void => {
  const stack = initializeStack('10.101.1.0/24');
  expect(stack).to(countResources('AWS::EC2::InternetGateway', 1));

  for (let i = 0; i < 6; i++) {
    expect(stack).to(
      haveResource('AWS::EC2::Subnet', {
        CidrBlock: `10.101.1.${i * 32}/27`, // 27 is the right number
      }),
    );
  }
});
