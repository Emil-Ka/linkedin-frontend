import { IPassedTestsResponse } from '../../redux/types/passed-test';
import { ITestResponse } from '../../redux/types/test';

export interface ITests {
  passedTest: IPassedTestsResponse;
  test: ITestResponse;
}
