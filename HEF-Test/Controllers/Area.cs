using HEF_API.Controllers;
using HEF_API.Services;
using Moq;
using Xunit;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Diagnostics;
using System.Text;
using HEF_API.Models;
using Bogus;

namespace HEF_Test.Controllers
{
    public class AreaContollerTest
    {
        private AreaController contoller;
        private Mock<IAreaService> areaSericeMock;
        private Mock<IArea> areaMock;

        private List<Area> areaList;

        public AreaContollerTest(IServiceWrapper service)
        {
            areaSericeMock = new Mock<IAreaService>();
            areaMock = new Mock<IArea>();

            Faker<Area> areaFaker = new ModelGenerator().GetAreaGenerator;
            areaList = areaFaker.Generate(10);

            contoller = new AreaController(service);
        }
    }
}
