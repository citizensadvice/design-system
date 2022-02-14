# frozen_string_literal: true

Before do |test_case|
  CucumberInfo.test_case = test_case
  skip_this_scenario("Scenario is not permitted to run. See logs for details") if CucumberInfo.skip_scenario?
  test_case.source_tag_names.include?("@small_screen") ? resize_window(320, 568) : resize_window
  AutomationLogger.info("Running Scenario: #{test_case.name}")
end

After do |test_case|
  if test_case.failed?
    AutomationLogger.info("Scenario: #{test_case.name} - Status: FAILED")
    AutomationLogger.error("ERROR: #{test_case.exception&.message}")
    AutomationLogger.error("ERROR TYPE: #{test_case.exception.class}")
    test_case.exception&.backtrace&.each&.with_index(1) do |backtrace_line, index|
      AutomationLogger.error("BACKTRACE #{index}) #{backtrace_line}")
    end
    CucumberInfo.scenario_result = "failed"
  else
    AutomationLogger.info("Scenario: #{test_case.name} - Status: #{test_case.status.upcase}")
  end
end
