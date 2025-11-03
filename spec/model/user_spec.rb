require "rails_helper"

RSpec.describe User, type: :model do
  describe "associações" do
    it { is_expected.to have_one_attached(:avatar) }
  end

  describe "roles" do
    it "tem roles admin e user" do
      expect(User.roles.keys).to contain_exactly("admin", "user")
    end
  end

  describe "validações" do
    subject { create(:user) }

    it { is_expected.to validate_presence_of(:full_name) }
    it { is_expected.to validate_length_of(:full_name).is_at_least(10).is_at_most(100) }

    it { is_expected.to validate_presence_of(:email) }
    it { is_expected.to validate_uniqueness_of(:email).case_insensitive }
    it { is_expected.to allow_value("a@b.com").for(:email) }
    it { is_expected.not_to allow_value("invalido@@").for(:email) }
  end

  describe "avatar (tipo e tamanho)" do
    it "aceita imagens válidas jpg" do
      u = build(:user)
      u.avatar.attach(io: StringIO.new("img"), filename: "ok.jpg", content_type: "image/jpeg")
      expect(u).to be_valid
    end

    it "aceita imagens válidas png" do
      u = build(:user)
      u.avatar.attach(io: StringIO.new("img"), filename: "ok.png", content_type: "image/png")
      expect(u).to be_valid
    end

    it "aceita imagens válidas webp" do
      u = build(:user)
      u.avatar.attach(io: StringIO.new("img"), filename: "ok.webp", content_type: "image/webp")
      expect(u).to be_valid
    end

    it "rejeita tipos não imagem txt" do
      u = build(:user)
      u.avatar.attach(io: StringIO.new("bad"), filename: "bad.txt", content_type: "text/plain")
      expect(u).not_to be_valid
      expect(u.errors[:avatar]).to be_present
    end

    it "rejeita tipos não imagem pdf" do
      u = build(:user)
      u.avatar.attach(io: StringIO.new("bad"), filename: "bad.pdf", content_type: "application/pdf")
      expect(u).not_to be_valid
      expect(u.errors[:avatar]).to be_present
    end

    it "rejeita imagem maior que 5MB" do
      u = build(:user)
      big = "a" * (5.megabytes + 1)
      u.avatar.attach(io: StringIO.new(big), filename: "big.jpg", content_type: "image/jpeg")
      expect(u).not_to be_valid
      expect(u.errors[:avatar]).to be_present
    end
  end

  describe "slug" do
    it "gera slug a partir do full_name" do
      u = create(:user, full_name: "Maria da Silva")
      expect(u.slug).to be_present
    end

    it "gera slugs únicos para nomes iguais" do
      u1 = create(:user, full_name: "Joana Lima")
      u2 = create(:user, full_name: "Joana Lima")
      expect(u1.slug).to be_present
      expect(u2.slug).to be_present
      expect(u2.slug).not_to eq(u1.slug)
    end

    it "atualiza o slug quando o nome muda" do
      u = create(:user, full_name: "Carlos Alberto")
      old = u.slug
      u.update!(full_name: "Carlos Eduardo")
      expect(u.slug).not_to eq(old)
    end

    it "não muda o slug se o nome não mudar" do
      u = create(:user, full_name: "Pedro Henrique")
      old = u.slug
      u.touch
      u.save!
      expect(u.slug).to eq(old)
    end
  end

  describe "roles (enum/predicados)" do
    it "usa predicados admin?/user?" do
      u = create(:user, role: :user)
      a = create(:user, role: :admin)
      expect(u.user?).to be true
      expect(u.admin?).to be false
      expect(a.admin?).to be true
      expect(a.user?).to be false
    end

    it "lança erro em role inválida" do
      u = build(:user)
      expect { u.role = "superuser" }.to raise_error(ArgumentError)
    end
  end

  describe "Devise: validatable" do
    it "encripta a senha e valida com valid_password?" do
      u = create(:user, password: "S3nh@F0rte123", password_confirmation: "S3nh@F0rte123")
      expect(u.encrypted_password).to be_present
      expect(u.encrypted_password).not_to eq("S3nh@F0rte123")
      expect(u.valid_password?("S3nh@F0rte123")).to be true
      expect(u.valid_password?("errada")).to be false
    end

    it "rejeita senha curta" do
      u = build(:user, password: "12345", password_confirmation: "12345")
      expect(u).not_to be_valid
      expect(u.errors[:password]).to be_present
    end

    it "rejeita confirmação diferente" do
      u = build(:user, password: "12345678", password_confirmation: "87654321")
      expect(u).not_to be_valid
      expect(u.errors[:password_confirmation]).to be_present
    end

    it "não permite e-mail duplicado case-insensitive" do
      create(:user, email: "MixCase@Email.com")
      u = build(:user, email: "mixcase@email.com")
      expect(u).not_to be_valid
      expect(u.errors[:email]).to be_present
    end
  end

end