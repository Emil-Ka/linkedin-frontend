import { IPassedTestsResponse } from '../../redux/types/passed-test';
import { IGetTestResponse } from '../../redux/types/test';

export interface ITests {
  passedTest: IPassedTestsResponse;
  test: IGetTestResponse;
}
