const app = require("../../main");
const supertest = require("supertest");
jest.mock("../../models");
const { Account } = require("../../models");

test("닉네임은 최소 3자 이상이며, 알파벳 대소문자(a~z, A~Z) 및 숫자(0~9)의 혼합으로 이루어져야 합니다.", async (done) => {
  const res = await supertest(app)
    .post("/accountAPI/signUp")
    .set("Accept", "application/json")
    .type("application/json")
    .send({
      nickname: "uu",
      password: "1234",
      chkPassword: "1234",
    });

  expect(res.status).toEqual(400);
  expect(JSON.parse(res.text)["modal_body"]).toEqual("양식에 맞지 않습니다.");
  done();
});

test("닉네임은 최소 3자 이상이며, 알파벳 대소문자(a~z, A~Z) 및 숫자(0~9)의 혼합으로 이루어져야 합니다.", async (done) => {
  const res = await supertest(app)
    .post("/accountAPI/signUp")
    .set("Accept", "application/json")
    .type("application/json")
    .send({
      nickname: "123456",
      password: "1234",
      chkPassword: "1234",
    });

  expect(res.status).toEqual(400);
  expect(JSON.parse(res.text)["modal_body"]).toEqual(
    "닉네임은 최소 3자 이상이며, 알파벳 대소문자(a~z, A~Z) 및 숫자(0~9)의 혼합으로 이루어져야 합니다."
  );
  done();
});

test("비밀번호는 최소 4자 이상이며, 닉네임과 같은 값이 포함된 경우 회원가입에 실패합니다.", async (done) => {
  const res = await supertest(app)
    .post("/accountAPI/signUp")
    .set("Accept", "application/json")
    .type("application/json")
    .send({
      nickname: "uko02218",
      password: "123",
      chkPassword: "123",
    });

  expect(res.status).toEqual(400);
  expect(JSON.parse(res.text)["modal_body"]).toEqual("양식에 맞지 않습니다.");
  done();
});

test("비밀번호는 최소 4자 이상이며, 닉네임과 같은 값이 포함된 경우 회원가입에 실패합니다.", async (done) => {
  const res = await supertest(app)
    .post("/accountAPI/signUp")
    .set("Accept", "application/json")
    .type("application/json")
    .send({
      nickname: "uko02218",
      password: "uko02218",
      chkPassword: "uko02218",
    });

  expect(res.status).toEqual(400);
  expect(JSON.parse(res.text)["modal_body"]).toEqual(
    "비밀번호는 최소 4자 이상이며, 비밀번호에 닉네임과 같은 값이 포함되면 안됩니다."
  );
  done();
});

test("비밀번호 확인은 비밀번호와 정확하게 일치해야 합니다.", async (done) => {
  const res = await supertest(app)
    .post("/accountAPI/signUp")
    .set("Accept", "application/json")
    .type("application/json")
    .send({
      nickname: "uko02218",
      password: "1234",
      chkPassword: "1231",
    });

  expect(res.status).toEqual(400);
  expect(JSON.parse(res.text)["modal_body"]).toEqual(
    "비밀번호 확인은 비밀번호와 정확하게 일치해야 합니다."
  );
  done();
});

test("비밀번호 확인은 비밀번호와 정확하게 일치해야 합니다.", async (done) => {
  const res = await supertest(app)
    .post("/accountAPI/signUp")
    .set("Accept", "application/json")
    .type("application/json")
    .send({
      nickname: "uko02218",
      password: "holymoly",
      chkPassword: "molyholy",
    });

  expect(res.status).toEqual(400);
  expect(JSON.parse(res.text)["modal_body"]).toEqual(
    "비밀번호 확인은 비밀번호와 정확하게 일치해야 합니다."
  );
  done();
});

describe("addFollowing", () => {
  test("데이터베이스에 존재하는 닉네임을 입력한 채 회원가입 버튼을 누른 경우 '중복된 닉네임입니다.' 라는 에러메세지가 발생합니다.", async (done) => {
    Account.findOne = jest.fn();
    Account.create = jest.fn();

    const res = await supertest(app)
      .post("/accountAPI/signUp")
      .set("Accept", "application/json")
      .type("application/json")
      .send({
        nickname: "uko02218",
        password: "4633877",
        chkPassword: "4633877",
      });
    expect(Account.findOne).toHaveBeenCalledTimes(1);
    done();
  });

  test("데이터베이스에 존재하는 닉네임을 입력한 채 회원가입 버튼을 누른 경우 '중복된 닉네임입니다.' 라는 에러메세지가 발생합니다.", async (done) => {
    Account.findOne = jest.fn();
    Account.create = jest.fn();
    const res = await supertest(app)
      .post("/accountAPI/signUp")
      .set("Accept", "application/json")
      .type("application/json")
      .send({
        nickname: "uko02218",
        password: "4633877",
        chkPassword: "4633877",
      });

    expect(Account.findOne).toHaveBeenCalledTimes(1);
    expect(Account.create).toHaveBeenCalledTimes(1);
    expect(JSON.parse(res.text)["modal_body"]).toEqual(
      "회원이 되신것을 축하드립니다!"
    );
    done();
  });
});
