# frozen_string_literal: true

class App
  def home
    @home ||= Home.new
  end

  def immigration
    @immigration ||= Immigration.new
  end

  def get_immigration_advice
    @get_immigratinon_advice ||= GetImmigrationAdvice.new
  end

  def search
    @search ||= Search.new.tap(&:when_loaded)
  end

  def state_pension
    @state_pension ||= StatePension.new
  end
end
